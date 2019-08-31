const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const schedule = require('node-schedule');
const path = require('path');

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('4e7c5bf8c27c418db8eb6f639325e873');

const news = require('./routes/api/news');

const NewsPiece = require('./models/NewsPiece');

const app = express();

app.use(cors());

// Bodyparser middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to db
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('DB connected '))
  .catch(err => console.log(err));

// Use routes
app.use('/api/news', news);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${PORT}`);

  var j = schedule.scheduleJob('* * 8 * *', function() {
    NewsPiece.find((err, news) => {
      if (err) return console.error(err);
      news.forEach(newsItem => {
        newsItem.remove();
      });
    });
    const collections = [
      'general',
      'business',
      'health',
      'science',
      'entertainment',
      'technology',
      'sports'
    ];

    collections.forEach(collection => {
      newsapi.v2
        .topHeadlines({
          // sources: 'bbc-news,the-verge',
          category: `${collection}`,
          language: 'en',
          country: 'us'
        })
        .then(response => {
          response.articles.forEach(article => {
            if (article.title && article.description && article.urlToImage) {
              const newsPiece = new NewsPiece({
                category: `${collection}`,
                title: article.title,
                author: article.author,
                description: article.description,
                content: article.content,
                urlToImage: article.urlToImage,
                source: article.source.name,
                publishedAt: article.publishedAt,
                url: article.url
              });
              newsPiece
                .save()
                .then()
                .catch(err => console.log(err));
            }
          });
        })
        .catch(err => console.log(err));
    });
  });
});
