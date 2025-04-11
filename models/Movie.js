const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  youtubeUrl: String,
  thumbnail: String,
  categories: [String],
  year: Number,
  rating: Number,
});

module.exports = mongoose.model('Movie', movieSchema); 