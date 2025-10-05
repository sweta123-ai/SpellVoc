const Payment = require('../models/Payment');

exports.createPayment = async (req, res, next) => {
  try {
    const { name, email, phone, plan, startDate } = req.body;
    if (!name || !email || !phone || !plan || !startDate) return res.status(400).json({ error: 'missing fields' });

    const p = await Payment.create({ name, email, phone, plan, startDate });
    res.json({ ok: true, payment: p });
  } catch (err) { next(err); }
};

exports.listPayments = async (req, res, next) => {
  try {
    const all = await Payment.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) { next(err); }
};
