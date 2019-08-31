const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const NewsPieceSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  publishedAt: {
    type: Date
  },
  description: {
    type: String
  },
  content: {
    type: String
  },
  author: {
    type: String
  },
  urlToImage: {
    type: String
  },
  source: {
    type: String
  },
  url: {
    type: String
  }
});

module.exports = NewsItem = mongoose.model('NewsItem', NewsPieceSchema);
