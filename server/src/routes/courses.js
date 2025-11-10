const router = require('express').Router();
const Course = require('../models/Course');
const { ensureConnection } = require('../config/db');

router.get('/', async (_req, res, next) => {
  try {
    // Ensure database connection is ready before operations
    const isConnected = await ensureConnection();
    if (!isConnected) {
      return res.status(503).json({ error: 'Database connection unavailable. Please try again.' });
    }

    const courses = await Course.find({ status: 'active' }).select('title description');
    res.json(courses);
  } catch (err) { next(err); }
});

module.exports = router;