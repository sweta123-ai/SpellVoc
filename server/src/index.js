const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

console.log("Loaded PORT from .env:", process.env.PORT);
console.log("Loaded RAZORPAY_KEY_ID:", !!process.env.RAZORPAY_KEY_ID); // shows whether key exists (true/false)

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_1234567890abcdef',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'your_test_key_secret'
});

app.post('/create-order', async (req, res) => {
  try {
    const { amountInPaise, currency = 'INR', receipt = 'rcpt_' + Date.now(), notes = {} } = req.body || {};
    if (!amountInPaise || isNaN(amountInPaise)) {
      return res.status(400).json({ error: 'Invalid amountInPaise' });
    }
    const options = { amount: amountInPaise, currency, receipt, notes, payment_capture: 1 };
    const order = await razorpay.orders.create(options);
    return res.json(order);
  } catch (err) {
    console.error('Order creation failed:', err);
    return res.status(500).json({ error: 'Failed to create order', details: err.message });
  }
});

// optional root route to quickly confirm server is up
app.get('/', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
