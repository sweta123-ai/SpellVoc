const router = require('express').Router();
const Joi = require('joi');
const auth = require('../middleware/auth');
const Reservation = require('../models/Reservation');

const reservationSchema = Joi.object({
  planName: Joi.string().required(),
  priceText: Joi.string().allow('', null),
  startDate: Joi.date().required()
});

router.post('/', auth, async (req, res, next) => {
  try {
    const { value, error } = reservationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    const reservation = await Reservation.create({
      userId: req.user.id,
      planName: value.planName,
      priceText: value.priceText || '',
      startDate: value.startDate
    });
    res.status(201).json(reservation);
  } catch (err) { next(err); }
});

router.get('/me', auth, async (req, res, next) => {
  try {
    const reservations = await Reservation.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(reservations);
  } catch (err) { next(err); }
});

module.exports = router; 