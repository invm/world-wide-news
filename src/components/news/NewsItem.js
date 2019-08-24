import React, { Fragment, useContext, useState } from 'react';
import NewsContext from '../../context/news/newsContext';

import { Link } from 'react-router-dom';

const NewsItem = ({ newsItem }) => {
  const newsContext = useContext(NewsContext);

  const single = newsItem ? newsItem : newsContext.single;

  const {
    title,
    description,
    urlToImage,
    publishedAt,
    source,
    content,
    author
  } = single;

  // const publishTime = `${publishedAt.slice(8, 10)}
  // ${publishedAt.slice(5, 7)}
  // ${publishedAt.slice(0, 4)}` ;

  const handleSingle = () => {
    newsContext.single = newsItem;
    console.log(newsContext.single);
  };

  return (
    <div className='news-item'>
      <div className='header'>
        <p className='badge'>{publishedAt}</p>
        <p className='badge'>{source.name}</p>
      </div>
      <Fragment>
        <h1>{title}</h1>
        <p>{description}</p>
      </Fragment>
      <img src={urlToImage} alt={title} />

      <Link to={`/news/${title}`}>
        <button className='badge ' onClick={handleSingle}>
          Read More
        </button>
      </Link>
    </div>
  );
};

export default NewsItem;
