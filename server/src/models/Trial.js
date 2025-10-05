const mongoose = require('mongoose');

const trialSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: false, index: true },
  courseTitle: { type: String, required: false, trim: true },  registeredAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Index for performance - removed unique constraints to allow multiple trials
trialSchema.index({ userId: 1, courseId: 1 });
trialSchema.index({ userId: 1, courseTitle: 1 });

module.exports = mongoose.model('Trial', trialSchema);
