const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  planName: { type: String, required: true },
  priceText: { type: String },
  startDate: { type: Date, required: true },
  status: { type: String, enum: ['open', 'confirmed', 'cancelled'], default: 'open' }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
