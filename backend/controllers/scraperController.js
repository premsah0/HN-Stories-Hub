const scrapeHN = require('../scraper/hnScraper');

const triggerScraper = async (req, res) => {
  try {
    const result = await scrapeHN();
    if (result.success) {
      res.json({ message: `Scraping successful. Added ${result.count} new stories.` });
    } else {
      res.status(500).json({ message: 'Scraping failed', error: result.error });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { triggerScraper };
