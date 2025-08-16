const Summary = require('../models/Summary');
const ShareHistory = require('../models/ShareHistory');
const transporter = require('../utils/emailService');

exports.shareSummary = async (req, res, next) => {
  try {
    const { summaryId, editedSummary, recipients, subject } = req.body;

    // Validate input
    if (!summaryId || !recipients || !Array.isArray(recipients)) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: summaryId and recipients array are required'
      });
    }

    // Update summary if edited
    if (editedSummary) {
      await Summary.findByIdAndUpdate(summaryId, {
        editedSummary,
        updatedAt: Date.now()
      });
    }

    // Get the summary content
    const summary = await Summary.findById(summaryId);
    const contentToSend = editedSummary || summary.summary;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipients.join(', '),
      subject: subject || 'Meeting Summary',
      text: contentToSend,
      html: `<pre>${contentToSend}</pre>`
    });

    // Record share history
    const shareRecord = new ShareHistory({
      summaryId,
      recipients,
      subject: subject || 'Meeting Summary'
    });

    await shareRecord.save();

    res.status(200).json({
      success: true,
      data: {
        message: 'Summary shared successfully',
        shareId: shareRecord._id
      }
    });

  } catch (error) {
    next(error);
  }
};

exports.getShareHistory = async (req, res, next) => {
  try {
    const shares = await ShareHistory.find({ summaryId: req.params.id })
      .sort({ sharedAt: -1 })
      .populate('summaryId', 'summary editedSummary createdAt');

    res.status(200).json({
      success: true,
      count: shares.length,
      data: shares
    });
  } catch (error) {
    next(error);
  }
};