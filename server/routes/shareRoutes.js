const express = require('express');
const {
  shareSummary,
  getShareHistory
} = require('../controllers/shareController');

const router = express.Router();

router.post('/', shareSummary);
router.get('/:id', getShareHistory);

module.exports = router;