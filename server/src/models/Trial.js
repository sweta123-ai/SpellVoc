const router = require('express').Router();
const Joi = require('joi');
const auth = require('../middleware/auth');
const Trial = require('../models/Trial');

const trialSchema = Joi.object({ courseId: Joi.string().optional(), courseTitle: Joi.string().optional(), course: Joi.string().optional(), courseSelect: Joi.string().optional() })
  .or('courseId', 'courseTitle', 'course', 'courseSelect');

router.post('/', auth, async (req, res, next) => {
  try {
    const { value, error } = trialSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    let courseTitle = value.courseTitle || value.course || value.courseSelect || '';
    if (!courseTitle && value.courseId) {
      // If only ID given, keep as is; UI can populate by populate()
    }
    console.log('[TRIAL][CREATE] user', req.user.id, 'title', courseTitle, 'courseId', value.courseId || null);
    const trial = await Trial.create({ userId: req.user.id, courseId: value.courseId || undefined, courseTitle: courseTitle || undefined });
    res.status(201).json(trial);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Trial already exists for this course' });
    }
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