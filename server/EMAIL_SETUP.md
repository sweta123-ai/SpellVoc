# Email Setup for Password Reset

## Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

3. **Create `.env` file** in the server directory with:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
FRONTEND_URL=http://localhost:4000
```

## Alternative Email Services

### Outlook/Hotmail
```javascript
// In emailService.js, replace the transporter config:
const transporter = nodemailer.createTransporter({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

### Custom SMTP
```javascript
// In emailService.js, replace the transporter config:
const transporter = nodemailer.createTransporter({
  host: 'smtp.your-provider.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

## Testing

1. Set up your `.env` file with email credentials
2. Start the server: `npm start`
3. Go to the login page and click "Forgot Password"
4. Enter a valid email address
5. Check your email for the reset link
6. Click the link to reset your password

## Security Notes

- Never commit your `.env` file to version control
- Use app passwords instead of your main password
- Consider using environment variables in production
- The reset token expires in 1 hour for security
