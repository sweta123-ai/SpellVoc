const nodemailer = require('nodemailer');

// Create transporter for sending emails
const createTransporter = () => {
  // Prefer explicit SMTP credentials if provided (production-grade providers like SendGrid/Mailgun/SES)
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const secure = String(process.env.SMTP_SECURE || '').toLowerCase() === 'true' || port === 465;
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
  }

  // Fallback to Gmail service using EMAIL_USER/EMAIL_PASS (App Password required)
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'swetasipra0828@gmail.com',
      pass: process.env.EMAIL_PASS || 'hjjw htwg sntc yveq'
    }
  });
};

async function verifyMailer(transporter) {
  try {
    await transporter.verify();
    return true;
  } catch (err) {
    console.error('[MAILER][VERIFY][ERR]', err && (err.message || err));
    throw new Error('Email transporter verification failed. Check SMTP or Gmail App Password.');
  }
}

// Send password reset email
const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    const transporter = createTransporter();
    await verifyMailer(transporter);
    
    // Create reset link (you'll need to replace with your actual domain)
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:4000'}/reset-password.html?token=${resetToken}`;
    
    const fromName = process.env.EMAIL_FROM_NAME || 'SpellVoc';
    const fromEmail = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'your-email@gmail.com';
    const mailOptions = {
      from: `${fromName} <${fromEmail}>`,
      to: email,
      subject: 'Password Reset Request - SpellVoc',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #667eea;">Password Reset Request</h2>
          <p>Hello,</p>
          <p>You have requested to reset your password for your SpellVoc account.</p>
          <p>Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; 
                      padding: 12px 30px; 
                      text-decoration: none; 
                      border-radius: 5px; 
                      display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>Or copy and paste this link in your browser:</p>
          <p style="word-break: break-all; color: #667eea;">${resetLink}</p>
          <p><strong>This link will expire in 1 hour.</strong></p>
          <p>If you didn't request this password reset, please ignore this email.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            This email was sent from SpellVoc. If you have any questions, please contact our support team.
          </p>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
};

// Send password reset OTP email
const sendPasswordResetOtpEmail = async (email, otpCode) => {
  try {
    const transporter = createTransporter();
    await verifyMailer(transporter);

    const fromName = process.env.EMAIL_FROM_NAME || 'SpellVoc';
    const fromEmail = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'your-email@gmail.com';
    const mailOptions = {
      from: `${fromName} <${fromEmail}>`,
      to: email,
      subject: 'Your SpellVoc password reset code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #667eea;">Password Reset Verification</h2>
          <p>Hello,</p>
          <p>Use the following one-time code to reset your SpellVoc password:</p>
          <div style="text-align:center; margin: 24px 0;">
            <div style="display:inline-block; letter-spacing: 6px; font-size: 28px; font-weight: 700; background:#f4f6ff; color:#333; padding: 12px 18px; border-radius: 8px; border: 1px solid #e3e7ff">${otpCode}</div>
          </div>
          <p><strong>This code will expire in 10 minutes.</strong></p>
          <p>If you didn't request this, you can safely ignore this email.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">SpellVoc Support</p>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Password reset OTP email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending password reset OTP email:', error);
    throw new Error('Failed to send password reset OTP email');
  }
};

module.exports = {
  sendPasswordResetEmail,
  sendPasswordResetOtpEmail
};
