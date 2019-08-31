import React, { Fragment, useContext } from 'react';
import NewsContext from '../../context/news/newsContext';

import { Link } from 'react-router-dom';

const NewsItem = ({ newsItem, parent }) => {
  const newsContext = useContext(NewsContext);

  // Used to save a single news item if 'read more' is pressed, get passed to the new NewsItem from state.
  // or in case if the user was on a single news item page and hit refresh
  let singleItem = undefined;
  let singleItemId = window.location.pathname.slice(6);
  // eslint-disable-next-line
  for (let category in newsContext.news) {
    // eslint-disable-next-line
    for (let newsItem in newsContext.news[category]) {
      if (newsContext.news[category][newsItem]._id === singleItemId) {
        singleItem = newsContext.news[category][newsItem];
      }
    }
  }

  const single = newsItem ? newsItem : singleItem;

  // Check if the component is read in 'news' section, if so also show author and content
  const path = window.location.pathname.slice(1, 5);
  let [content, author] = ['', ''];

  // null everything if refreshed on a single news item
  if (path === 'news' && single != null) {
    content = single.content || '';
    author = single.author || '';
  }

  let { _id, title, source, urlToImage, publishedAt, url } = single || {};
  let { description } = single || {};

  if (parent === 'suggest') {
    description = '';
    content = '';
    author = '';
  }
  if (parent === 'sidebar') {
    description = '';
    content = '';
    author = '';
    urlToImage = '';
    publishedAt = '';
  }

  // Import all from props , or single news item saved in context

  const handleSingle = () => {
    newsContext.single = newsItem;
  };

  if (single == null) {
    return null;
  }
  return (
    <div className='news-item'>
      {!parent && (
        <div className='header'>
          <p className='badge'>{publishedAt.slice(0, 10)}</p>
          <p className='badge'>{source}</p>
        </div>
      )}
      <Fragment>
        <h1>{title}</h1>
        {!parent && <div>{description}</div>}
      </Fragment>
      <Fragment>
        {author && <h2 className='badge'>{author}</h2>}
        {content && <div>{content}</div>}
      </Fragment>
      {urlToImage && <img src={urlToImage} alt={title} />}
      {path === 'news' && !parent ? (
        <a href={url}>
          <button className='badge ' onClick={handleSingle}>
            Read full story on {source}
          </button>
        </a>
      ) : (
        <Link to={`/news/${_id}`}>
          <button className='badge ' onClick={handleSingle}>
            Read More
          </button>
        </Link>
      )}
    </div>
  );
};

export default NewsItem;
