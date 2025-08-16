const express = require('express');
const multer = require('multer');
const upload = multer();
const {
  generateSummary,
  getSummaries,
  getSummary
} = require('../controllers/summaryController');

const router = express.Router();

router.post('/', upload.single('file'), generateSummary);
router.get('/', getSummaries);
router.get('/:id', getSummary);

module.exports = router;