const Story = require('../models/Story');
const User = require('../models/User');

const getAllStories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const stories = await Story.find({})
      .sort({ points: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (story) {
      res.json(story);
    } else {
      res.status(404).json({ message: 'Story not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleBookmark = async (req, res) => {
  try {
    const storyId = req.params.id;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isBookmarked = user.bookmarks.includes(storyId);

    if (isBookmarked) {
      user.bookmarks = user.bookmarks.filter(id => id.toString() !== storyId);
    } else {
      user.bookmarks.push(storyId);
    }

    await user.save();
    res.json({ message: isBookmarked ? 'Bookmark removed' : 'Bookmark added', bookmarks: user.bookmarks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllStories, getStory, toggleBookmark };
