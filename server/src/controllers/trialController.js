const Trial = require('../models/Trial');

exports.createTrial = async (req, res, next) => {
  try {
    const { name, email, phone, courseSelect, courseInput } = req.body;
    const course = courseSelect || courseInput;
    if (!name || !email || !phone || !course) return res.status(400).json({ error: 'missing fields' });

    const t = await Trial.create({ name, email, phone, course });
    res.json({ ok: true, trial: t });
  } catch (err) { next(err); }
};

exports.listTrials = async (req, res, next) => {
  try {
    const all = await Trial.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) { next(err); }
};
