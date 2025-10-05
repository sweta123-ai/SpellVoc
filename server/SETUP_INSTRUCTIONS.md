# Setup Instructions for Email Functionality

## Step 1: Create Your .env File

Create a file named `.env` in the `server` folder with this content:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/spellvoc

# JWT Secrets
JWT_ACCESS_SECRET=your-access-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-key-here
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL=7d

# Email Configuration - USE YOUR OWN EMAIL HERE
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-here
FRONTEND_URL=http://localhost:4000

# Server
PORT=4000
```

## Step 2: Set Up Your Email (Gmail Example)

### Option A: Gmail (Recommended)
1. **Use your own Gmail account** (the one you want to send emails from)
2. **Enable 2-Factor Authentication** on your Gmail
3. **Generate App Password**:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Select "Mail" and generate password
   - Copy the 16-character password
4. **Update .env file**:
   ```env
   EMAIL_USER=youremail@gmail.com
   EMAIL_PASS=your-16-character-app-password
   ```

### Option B: Other Email Services
- **Outlook**: Use your Outlook email and password
- **Yahoo**: Use your Yahoo email and app password
- **Custom SMTP**: Use any email service that supports SMTP

## Step 3: How It Works

### The Flow:
1. **User registers** with their email (e.g., `john@example.com`)
2. **User forgets password** and enters their email (`john@example.com`)
3. **Your server** uses YOUR email account to send reset link to `john@example.com`
4. **John receives email** in his inbox with reset link
5. **John clicks link** and resets his password

### Example:
- **Your email** (for sending): `admin@spellvoc.com`
- **User's email** (receiving): `john@example.com`
- **Result**: John gets reset email from admin@spellvoc.com

## Step 4: Test the Functionality

1. **Start your server**: `npm start`
2. **Register a new user** with any email
3. **Click "Forgot Password"** and enter that email
4. **Check the email inbox** for the reset link
5. **Click the link** and reset the password

## Important Notes

- ✅ **You only need ONE email account** to send emails
- ✅ **Users provide their own emails** during registration
- ✅ **No need to know user passwords** - they reset their own
- ✅ **Secure and private** - each user gets their own reset link
- ✅ **Professional** - emails come from your domain/email

## Troubleshooting

### If emails don't send:
1. Check your `.env` file has correct credentials
2. For Gmail: Make sure you're using App Password, not regular password
3. Check server console for error messages
4. Verify your email service allows SMTP

### If users don't receive emails:
1. Check spam/junk folder
2. Verify the email address is correct
3. Check if your email service has sending limits
