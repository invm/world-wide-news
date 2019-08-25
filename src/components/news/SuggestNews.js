import React, { useContext } from 'react';
import NewsItem from './NewsItem';
import NewsContext from '../../context/news/newsContext';

const SuggestNews = () => {
  const newsContext = useContext(NewsContext);
  const news = newsContext.news.headlines;
  return (
    <div className='suggest'>
      <h3 className='tc'> Suggested News</h3>
      <div className='inner'>
        {news.map(item => (
          <NewsItem newsItem={item} key={item.title} parent={'suggest'} />
        ))}
      </div>
    </div>
  );
};

export default SuggestNews;
