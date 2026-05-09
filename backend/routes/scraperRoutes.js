const express = require('express');
const { triggerScraper } = require('../controllers/scraperController');

const router = express.Router();

router.post('/', triggerScraper);

module.exports = router;
