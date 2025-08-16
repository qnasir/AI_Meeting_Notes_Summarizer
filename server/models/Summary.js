const mongoose = require('mongoose');

const SummarySchema = new mongoose.Schema({
  transcript: {
    type: String,
    required: true
  },
  prompt: {
    type: String,
    required: false
  },
  summary: {
    type: String,
    required: true
  },
  editedSummary: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

SummarySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Summary', SummarySchema);