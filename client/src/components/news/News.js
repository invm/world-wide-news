import React, { useContext, Fragment } from 'react';
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
      <Fragment>
        <h1 className='tc'>{`${type[0].toUpperCase()}${type.slice(
          1
        )} News`}</h1>
        <div style={homePageStyle}>
          {type === 'general' && (
            <div className='headlines'>
              <div className='main-headline'>
                <NewsItem newsItem={news[0]} key={news[0]} />
              </div>
              <div className='sub-headlines'>
                <div className='sub-headline-item'>
                  <NewsItem
                    newsItem={news[1]}
                    key={news[1]}
                    parent={'suggest'}
                  />
                </div>
                <div className='sub-headline-item'>
                  <NewsItem
                    newsItem={news[2]}
                    key={news[2]}
                    parent={'suggest'}
                  />
                </div>
              </div>
            </div>
          )}
          <div className='grid-2'>
            {news.slice(4, -4).map(newsItem => (
              // First 3 pieces go to headlines above and four last go to suggested news
              <NewsItem newsItem={newsItem} key={newsItem._id} />
            ))}
          </div>
        </div>
      </Fragment>
    );
  }
};

const homePageStyle = {
  display: 'flex',
  justifyContent: 'center',
  flexFlow: 'column',
  alignItems: 'center'
};

export default News;
