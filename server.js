const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const path = require('path'); // <-- add this
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve frontend files from 'public' folder (same level as server.js)
app.use(express.static(path.join(__dirname, 'public'))); // adjust path if needed

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

// Optional: fallback for SPA
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
