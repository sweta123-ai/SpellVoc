// Simple test script to verify email functionality
const { sendPasswordResetEmail } = require('./src/utils/emailService');

async function testEmail() {
  try {
    console.log('Testing email functionality...');
    console.log('Make sure you have set up your .env file with EMAIL_USER and EMAIL_PASS');
    
    // Test with a sample email (replace with your own email for testing)
    const testEmail = 'your-test-email@gmail.com'; // Change this to your email
    const testToken = 'test-token-123';
    
    console.log(`Sending test email to: ${testEmail}`);
    const result = await sendPasswordResetEmail(testEmail, testToken);
    
    console.log('✅ Email sent successfully!');
    console.log('Check your email inbox for the reset link.');
    console.log('Result:', result);
    
  } catch (error) {
    console.error('❌ Email sending failed:');
    console.error(error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Check your .env file has EMAIL_USER and EMAIL_PASS');
    console.log('2. For Gmail, use App Password, not regular password');
    console.log('3. Make sure 2FA is enabled on your Gmail account');
  }
}

// Run the test
testEmail();
