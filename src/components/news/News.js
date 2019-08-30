import React, { useContext } from 'react';
import NewsContext from '../../context/news/newsContext';
import NewsItem from '../news/NewsItem';
import Spinner from '../layout/Spinner';

const News = () => {
  const newsContext = useContext(NewsContext);
  const type =
    window.location.pathname.slice(1, window.location.pathname.length - 1) ||
    'general';
  const news = newsContext.news[`${type}`];
  const loading = newsContext.loading;
  if (news.length % 2) {
    // only show even number of news for style reasons
    news.pop();
  }
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div>
        <h1 className='tc'>{`${type[0].toUpperCase()}${type.slice(1)}`}</h1>
        <div className='grid-2'>
          {news.map(newsItem => (
            <NewsItem newsItem={newsItem} key={newsItem._id} />
          ))}
        </div>
      </div>
    );
  }
};

export default News;
