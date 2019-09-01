import React, { useContext } from 'react';
import NewsContext from '../../context/news/newsContext';
import Skycons from './Skycons';

const Weather = () => {
  const newsContext = useContext(NewsContext);
  //   do else and show 'allow location for weather'
  const loading = newsContext.weather.loading;
  let { timezone, temperature, summary, icon } = newsContext.weather;
  if (temperature) {
    temperature = ((5 / 9) * (Number(temperature) - 32)).toFixed() + '°C';
    icon = icon.replace(/-/g, '_').toUpperCase();
    summary = 'The weather today is ' + summary.toLowerCase();
  }
  if (loading) {
    temperature = null;
    return (
      <div className='weather-app'>
        <div className='location badge bg-primary'>
          All news provided by <a href='https://newsapi.org/'>NEWSAPI</a>
        </div>
        <div className='location badge bg-primary'>
          Please allow location to see current weather.
        </div>
      </div>
    );
  } else {
    return (
      <div className='weather-app'>
        <div className='location badge bg-primary'>
          All news provided by <a href='https://newsapi.org/'>NEWSAPI</a>
        </div>
        <div className='location badge bg-primary'>
          <h3 className='degrees'> {temperature} </h3>
          <h3 className='location'>{timezone}</h3>
        </div>
        <div className='temperature badge bg-primary'>
          <p className='weather-description'>{summary}</p>
          <p>
            <Skycons color='white' icon={icon} />
          </p>
        </div>
      </div>
    );
  }
};

export default Weather;
