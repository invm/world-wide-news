import React, { Fragment, useContext } from 'react';
import NewsContext from '../../context/news/newsContext';

import { Link } from 'react-router-dom';

const NewsItem = ({ newsItem, parent }) => {
  const newsContext = useContext(NewsContext);

  // Used to save a single news item if 'read more' is pressed, get passed to the new NewsItem from state.
  const single = newsItem ? newsItem : newsContext.single;

  // Check if the component is read in 'news' section, if so also show author and content
  const path = window.location.pathname.slice(1, 5);

  let [content, author] = ['', ''];

  if (path === 'news' && single != null) {
    content = single.content || '';
    author = single.author || '';
  }

  const { title, urlToImage, publishedAt, source } = single || {};
  let { description } = single || {};

  // null everything if refreshed on a single news item
  if (parent === 'suggest') {
    description = '';
    content = '';
    author = '';
  }
  // Import all from props , or single news item saved in context or empty object and display null when refreshed

  // Save a signle news item into state
  const handleSingle = () => {
    newsContext.single = newsItem;
  };

  if (single == null) {
    return null;
  }
  return (
    <div className='news-item'>
      <div className='header'>
        <p className='badge'>{publishedAt.slice(0, 10)}</p>
        <p className='badge'>{source.name}</p>
      </div>
      <Fragment>
        <h1>{title}</h1>
        {!parent && <div>{description}</div>}
      </Fragment>
      <Fragment>
        {author && <h2 className='badge'>{author}</h2>}
        {content && <div>{content}</div>}
      </Fragment>
      <img src={urlToImage} alt={title} />
      {path === 'news' && !parent ? null : (
        <Link to={`/news/${title}`}>
          <button className='badge ' onClick={handleSingle}>
            Read More
          </button>
        </Link>
      )}
    </div>
  );
};

export default NewsItem;
