const express = require('express');
const { getAllStories, getStory, toggleBookmark } = require('../controllers/storyController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getAllStories);
router.route('/:id').get(getStory);
router.route('/:id/bookmark').post(authMiddleware, toggleBookmark);

module.exports = router;
