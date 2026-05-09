const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  points: { type: Number, default: 0 },
  author: { type: String },
  postedAt: { type: String } // e.g. "2 hours ago" or timestamp
}, { timestamps: true });

module.exports = mongoose.model('Story', storySchema);
