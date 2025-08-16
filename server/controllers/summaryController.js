const Summary = require('../models/Summary');
const { generateSummaryWithAI } = require('../utils/groqClient');

exports.generateSummary = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    const transcript = req.file ? req.file.buffer.toString() : req.body.transcript;

    if (!transcript) {
      return res.status(400).json({ error: 'No transcript provided' });
    }

    const summaryContent = await generateSummaryWithAI(transcript, prompt);

    const newSummary = new Summary({
      transcript,
      prompt,
      summary: summaryContent
    });

    await newSummary.save();

    res.status(201).json({
      success: true,
      data: {
        id: newSummary._id,
        summary: summaryContent
      }
    });

  } catch (error) {
    next(error);
  }
};

exports.getSummaries = async (req, res, next) => {
  try {
    const summaries = await Summary.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: summaries.length,
      data: summaries
    });
  } catch (error) {
    next(error);
  }
};

exports.getSummary = async (req, res, next) => {
  try {
    const summary = await Summary.findById(req.params.id);
    
    if (!summary) {
      return res.status(404).json({
        success: false,
        error: 'Summary not found'
      });
    }

    res.status(200).json({
      success: true,
      data: summary
    });
  } catch (error) {
    next(error);
  }
};