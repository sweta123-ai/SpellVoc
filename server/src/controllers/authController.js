const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const ACCESS_TTL = process.env.ACCESS_TOKEN_TTL || '15m';
const REFRESH_TTL = process.env.REFRESH_TOKEN_TTL || '7d';

function signAccess(user) {
  return jwt.sign({ sub: user._id, email: user.email }, process.env.JWT_ACCESS_SECRET, { expiresIn: ACCESS_TTL });
}
function signRefresh(user) {
  return jwt.sign({ sub: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_TTL });
}

exports.register = async (req, res, next) => {
  try {
    const { fullName, phone, email, mode, category, password, message } = req.body;
    if (!fullName || !phone || !email || !mode || !category || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'user with this email already exists' });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ fullName, phone, email, mode, category, passwordHash, message });

    const accessToken = signAccess(user);
    const refreshToken = signRefresh(user);

    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax', maxAge: 7 * 24 * 3600 * 1000 });
    res.json({ accessToken, user: { id: user._id, fullName: user.fullName, email: user.email } });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { userId, password } = req.body; // userId can be email or phone
    if (!userId || !password) return res.status(400).json({ error: 'userId and password required' });

    const user = await User.findOne({ $or: [{ email: userId }, { phone: userId }] });
    if (!user) return res.status(401).json({ error: 'invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'invalid credentials' });

    const accessToken = signAccess(user);
    const refreshToken = signRefresh(user);

    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax', maxAge: 7 * 24 * 3600 * 1000 });
    res.json({ accessToken, user: { id: user._id, fullName: user.fullName, email: user.email } });
  } catch (err) { next(err); }
};

exports.refresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ error: 'no refresh token' });

    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ error: 'invalid token subject' });

    const accessToken = signAccess(user);
    res.json({ accessToken });
  } catch (err) {
    return res.status(401).json({ error: 'invalid refresh token' });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'lax' });
  res.json({ ok: true });
};
