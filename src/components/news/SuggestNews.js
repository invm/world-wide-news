import React, { useContext } from 'react';
import NewsItem from './NewsItem';
import NewsContext from '../../context/news/newsContext';

const SuggestNews = () => {
  const newsContext = useContext(NewsContext);
  const news = newsContext.news.general;
  return (
    <div className='suggest'>
      <h3 className='tc'> Suggested News</h3>
      <div className='inner'>
        {news.slice(-4).map(item => (
          <NewsItem newsItem={item} key={item._id} parent={'suggest'} />
        ))}
      </div>
    </div>
  );
};

export default SuggestNews;
