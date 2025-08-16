const mongoose = require('mongoose');

const ShareHistorySchema = new mongoose.Schema({
  summaryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Summary',
    required: true
  },
  recipients: {
    type: [String],
    required: true
  },
  sharedAt: {
    type: Date,
    default: Date.now
  },
  subject: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('ShareHistory', ShareHistorySchema);