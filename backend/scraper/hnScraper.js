const axios = require('axios');
const cheerio = require('cheerio');
const Story = require('../models/Story');

const scrapeHN = async () => {
  try {
    console.log('Starting Hacker News scrape...');
    const { data } = await axios.get('https://news.ycombinator.com/');
    const $ = cheerio.load(data);
    const stories = [];

    $('.athing').each((i, element) => {
      if (i >= 10) return false; // Get top 10 stories

      const id = $(element).attr('id');
      const titleElement = $(element).find('.titleline > a');
      const title = titleElement.text();
      const url = titleElement.attr('href');
      
      const subtext = $(`#score_${id}`).parent();
      let points = parseInt($(`#score_${id}`).text()) || 0;
      let author = subtext.find('.hnuser').text() || 'Unknown';
      let postedAt = subtext.find('.age').attr('title') || subtext.find('.age').text() || '';

      stories.push({ title, url, points, author, postedAt });
    });

    // 1. Fetch existing stories to preserve their IDs (so bookmarks don't break)
    const existingStories = await Story.find({});
    
    // 2. Delete existing stories completely
    await Story.deleteMany({});

    // 3. Insert only the top 10 stories
    const storiesToInsert = stories.map(story => {
      const existing = existingStories.find(e => e.url === story.url);
      if (existing) {
        return { ...story, _id: existing._id }; // preserve ID
      }
      return story;
    });

    await Story.insertMany(storiesToInsert);

    console.log(`Scraping complete. Inserted ${storiesToInsert.length} stories.`);
    return { success: true, count: storiesToInsert.length, totalScraped: stories.length };
  } catch (error) {
    console.error('Error scraping HN:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = scrapeHN;
