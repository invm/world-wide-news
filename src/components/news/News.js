import React, { useContext } from 'react';
import NewsContext from '../../context/news/newsContext';
import NewsItem from '../news/NewsItem';
import Spinner from '../layout/Spinner';

const News = () => {
  const newsContext = useContext(NewsContext);
  const type =
    window.location.pathname.slice(1, window.location.pathname.length - 1) ||
    'headlines';
  const news = newsContext.news[`${type}`];
  const loading = newsContext.loading;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className='grid-2'>
        {news.map(newsItem => (
          <NewsItem newsItem={newsItem} key={newsItem.url} />
        ))}
      </div>
    );
  }
};

export default News;
