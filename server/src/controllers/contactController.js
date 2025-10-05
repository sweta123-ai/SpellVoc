const Contact = require('../models/Contact');

exports.createContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !phone || !subject || !message) return res.status(400).json({ error: 'missing fields' });

    const c = await Contact.create({ name, email, phone, subject, message });
    res.json({ ok: true, contact: c });
  } catch (err) { next(err); }
};

exports.listContacts = async (req, res, next) => {
  try {
    const all = await Contact.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) { next(err); }
};
