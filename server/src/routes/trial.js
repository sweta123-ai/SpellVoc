const router = require('express').Router();
const Joi = require('joi');
const auth = require('../middleware/auth');
const Trial = require('../models/Trial');

const trialSchema = Joi.object({ courseId: Joi.string().optional(), courseTitle: Joi.string().optional() })
  .or('courseId', 'courseTitle');

router.post('/', auth, async (req, res, next) => {
  try {
    const { value, error } = trialSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    console.log('[TRIAL][CREATE] user', req.user.id, 'payload', value);
    const trial = await Trial.create({ userId: req.user.id, courseId: value.courseId || undefined, courseTitle: value.courseTitle || undefined });
    res.status(201).json(trial);
  } catch (err) {
    next(err);
  }
});

router.get('/me', auth, async (req, res, next) => {
  try {
    const trials = await Trial.find({ userId: req.user.id }).populate('courseId', 'title');
    res.json(trials);
  } catch (err) { next(err); }
});

module.exports = router;