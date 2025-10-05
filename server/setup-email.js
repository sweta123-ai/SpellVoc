const fs = require('fs');
const path = require('path');

console.log('🔧 Email Setup for SpellVoc Password Reset');
console.log('==========================================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log('✅ .env file already exists');
} else {
  console.log('📝 Creating .env file...');
  
  const envContent = `# Email Configuration - Replace with your actual email credentials
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-here
FRONTEND_URL=http://localhost:4000

# Database
MONGODB_URI=mongodb://localhost:27017/spellvoc

# JWT Secrets
JWT_ACCESS_SECRET=your-access-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-key-here
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL=7d

# Server
PORT=4000`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
}

console.log('\n📧 Next Steps:');
console.log('1. Open the .env file in your server folder');
console.log('2. Replace "your-email@gmail.com" with your actual Gmail address');
console.log('3. Replace "your-app-password-here" with your Gmail App Password');
console.log('\n🔐 How to get Gmail App Password:');
console.log('1. Go to your Google Account settings');
console.log('2. Security → 2-Step Verification → App passwords');
console.log('3. Generate a new app password for "Mail"');
console.log('4. Copy the 16-character password');
console.log('\n🧪 Test your setup:');
console.log('Run: node test-email.js');
console.log('\n🚀 Start your server:');
console.log('Run: npm start');
