import React, { useContext } from 'react';
import NewsContext from '../../context/news/newsContext';
import NewsItem from '../news/NewsItem';
import Weather from './Weather';

const Sidebar = () => {
  const newsContext = useContext(NewsContext);

  let news = [];
  // eslint-disable-next-line
  for (let newsCategory in newsContext.news) {
    let arr = newsContext.news[`${newsCategory}`].slice(-3);
    news = news.concat(arr);
  }
  return (
    <div className='sidebar'>
      <Weather />
      <div className='sidebar-news'>
        {news.map(newsItem => (
          <NewsItem newsItem={newsItem} key={newsItem._id} parent={'sidebar'} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
