const router = require('express').Router();
const Course = require('../models/Course');

router.get('/', async (_req, res, next) => {
  try {
    const courses = await Course.find({ status: 'active' }).select('title description');
    res.json(courses);
  } catch (err) { next(err); }
});

module.exports = router;