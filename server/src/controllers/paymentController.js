const Payment = require('../models/Payment');
const { ensureConnection } = require('../config/db');

exports.createPayment = async (req, res, next) => {
  try {
    // Ensure database connection is ready before operations
    const isConnected = await ensureConnection();
    if (!isConnected) {
      return res.status(503).json({ error: 'Database connection unavailable. Please try again.' });
    }

    const { name, email, phone, plan, startDate } = req.body;
    if (!name || !email || !phone || !plan || !startDate) return res.status(400).json({ error: 'missing fields' });

    const p = await Payment.create({ name, email, phone, plan, startDate });
    res.json({ ok: true, payment: p });
  } catch (err) { next(err); }
};

exports.listPayments = async (req, res, next) => {
  try {
    // Ensure database connection is ready before operations
    const isConnected = await ensureConnection();
    if (!isConnected) {
      return res.status(503).json({ error: 'Database connection unavailable. Please try again.' });
    }

    const all = await Payment.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) { next(err); }
};
