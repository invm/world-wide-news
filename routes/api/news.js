const express = require('express');
const router = express.Router();

// News piece model

const NewsPiece = require('../../models/NewsPiece');

// @route GET api/news
// @desc Get all news
// @access public

router.get('/', (req, res) => {
  NewsPiece.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route POST api/news
// @desc Create an news piece
// @access public // should be private with auth
router.post('/', (req, res) => {
  const newsPiece = new NewsPiece({
    title: article.title,
    author: article.author,
    description: article.description,
    content: article.content,
    urlToImage: article.urlToImage,
    source: article.source.name,
    publishedAt: article.publishedAt
  });
  newsPiece.save().then(item => res.json(item));
});

// @route DELETE api/news:id
// @desc Delete an news
// @access public // should be private with auth
router.delete('/:id', (req, res) => {
  newsPiece
    .findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
