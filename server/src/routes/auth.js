const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { signAccessToken, signRefreshToken, setAuthCookies, clearAuthCookies } = require('../utils/tokens');
const { sendPasswordResetEmail, sendPasswordResetOtpEmail } = require('../utils/emailService');
const { ensureConnection } = require('../config/db');

const registerSchema = Joi.object({
  fullName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).max(20).required(),
  password: Joi.string().min(8).required()
});

router.post('/register', async (req, res, next) => {
  try {
    // Ensure database connection is ready before operations
    const isConnected = await ensureConnection();
    if (!isConnected) {
      return res.status(503).json({ error: 'Database connection unavailable. Please try again.' });
    }

    const { value, error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const existing = await User.findOne({ email: value.email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const passwordHash = await bcrypt.hash(value.password, 10);
    const user = await User.create({ fullName: value.fullName, email: value.email, phone: value.phone, passwordHash });

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
    setAuthCookies(res, { accessToken, refreshToken });

    res.status(201).json({ id: user._id, fullName: user.fullName, email: user.email, phone: user.phone });
  } catch (err) { next(err); }
});

const loginSchema = Joi.object({ email: Joi.string().email().required(), password: Joi.string().required() });

router.post('/login', async (req, res, next) => {
  try {
    // Ensure database connection is ready before operations
    const isConnected = await ensureConnection();
    if (!isConnected) {
      return res.status(503).json({ error: 'Database connection unavailable. Please try again.' });
    }

    const { value, error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const user = await User.findOne({ email: value.email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(value.password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
    setAuthCookies(res, { accessToken, refreshToken });

    res.json({ id: user._id, fullName: user.fullName, email: user.email, phone: user.phone });
  } catch (err) { next(err); }
});

router.get('/me', auth, async (req, res, next) => {
  try {
    // Ensure database connection is ready before operations
    const isConnected = await ensureConnection();
    if (!isConnected) {
      return res.status(503).json({ error: 'Database connection unavailable. Please try again.' });
    }

    const user = await User.findById(req.user.id).select('fullName email phone role createdAt');
    res.json(user);
  } catch (err) { next(err); }
});

router.post('/refresh', async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    // Ensure database connection is ready before operations
    const isConnected = await ensureConnection();
    if (!isConnected) {
      return res.status(503).json({ error: 'Database connection unavailable. Please try again.' });
    }

    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
    setAuthCookies(res, { accessToken, refreshToken });
    res.json({ ok: true });
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
});

router.post('/logout', (req, res) => {
  clearAuthCookies(res);
  res.json({ ok: true });
});

// Forgot Password
router.post('/forgot-password', async (req, res, next) => {
  try {
    // Ensure database connection is ready before operations
    const isConnected = await ensureConnection();
    if (!isConnected) {
      return res.status(503).json({ error: 'Database connection unavailable. Please try again.' });
    }

    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) {
      // For security, don't reveal if email exists or not
      return res.json({ message: 'If the email exists, a reset link has been sent' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Send password reset email
    try {
      await sendPasswordResetEmail(email, resetToken);
      res.json({ message: 'If the email exists, a reset link has been sent' });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Still return success to user for security, but log the error
      res.json({ message: 'If the email exists, a reset link has been sent' });
    }
  } catch (err) { next(err); }
});

// Forgot Password via OTP (generate and email OTP)
router.post('/forgot-password-otp', async (req, res, next) => {
  try {
    // Ensure database connection is ready before operations
    const isConnected = await ensureConnection();
    if (!isConnected) {
      return res.status(503).json({ error: 'Database connection unavailable. Please try again.' });
    }

    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const user = await User.findOne({ email });
    // Always respond success to avoid enumeration
    const genericOk = { message: 'If the email exists, an OTP has been sent' };
    if (!user) return res.json(genericOk);

    // Generate 6-digit numeric OTP
    const otpCode = ('' + Math.floor(100000 + Math.random() * 900000));
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otpCode = otpCode;
    user.otpExpiry = otpExpiry;
    await user.save();

    try {
      await sendPasswordResetOtpEmail(email, otpCode);
      if (process.env.NODE_ENV !== 'production') {
        console.log('[DEV][OTP] Password reset OTP for', email, '=>', otpCode);
        return res.json({ ...genericOk, devOtp: otpCode });
      }
      return res.json(genericOk);
    } catch (e) {
      console.error('OTP email send failed:', e);
      if (process.env.NODE_ENV !== 'production') {
        console.log('[DEV][OTP][FALLBACK] Returning OTP in response for testing');
        // Return 200 so frontend can proceed with devOtp
        return res.json({ ...genericOk, devOtp: otpCode, note: 'Email send failed in dev; using devOtp fallback' });
      }
      return res.json(genericOk);
    }
  } catch (err) { next(err); }
});

// Verify OTP and reset password
router.post('/reset-password-otp', async (req, res, next) => {
  try {
    // Ensure database connection is ready before operations
    const isConnected = await ensureConnection();
    if (!isConnected) {
      return res.status(503).json({ error: 'Database connection unavailable. Please try again.' });
    }

    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ error: 'Email, OTP and new password are required' });
    }

    const user = await User.findOne({ email, otpCode: otp, otpExpiry: { $gt: new Date() } });
    if (!user) return res.status(400).json({ error: 'Invalid or expired OTP' });

    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.passwordHash = passwordHash;
    user.otpCode = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // Optionally sign-in user after reset
    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
    setAuthCookies(res, { accessToken, refreshToken });
    res.json({ message: 'Password reset successfully', autoLoggedIn: true });
  } catch (err) { next(err); }
});

// Reset Password
router.post('/reset-password', async (req, res, next) => {
  try {
    // Ensure database connection is ready before operations
    const isConnected = await ensureConnection();
    if (!isConnected) {
      return res.status(503).json({ error: 'Database connection unavailable. Please try again.' });
    }

    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token and new password are required' });
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.passwordHash = passwordHash;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (err) { next(err); }
});

module.exports = router;
