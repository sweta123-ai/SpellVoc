const Trial = require('../models/Trial');
const { ensureConnection } = require('../config/db');

exports.createTrial = async (req, res, next) => {
  try {
    // Ensure database connection is ready before operations
    const isConnected = await ensureConnection();
    if (!isConnected) {
      return res.status(503).json({ error: 'Database connection unavailable. Please try again.' });
    }

    const { name, email, phone, courseSelect, courseInput } = req.body;
    const course = courseSelect || courseInput;
    if (!name || !email || !phone || !course) return res.status(400).json({ error: 'missing fields' });

    const t = await Trial.create({ name, email, phone, course });
    res.json({ ok: true, trial: t });
  } catch (err) { next(err); }
};

exports.listTrials = async (req, res, next) => {
  try {
    // Ensure database connection is ready before operations
    const isConnected = await ensureConnection();
    if (!isConnected) {
      return res.status(503).json({ error: 'Database connection unavailable. Please try again.' });
    }

    const all = await Trial.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) { next(err); }
};
