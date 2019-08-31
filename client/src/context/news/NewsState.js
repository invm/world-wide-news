import React, { useReducer } from 'react';
import axios from 'axios';
import NewsContext from './newsContext';
import NewsReducer from './newsReducer';
import {
  SET_LOADING,
  FETCH_NEWS,
  SET_LOCATION,
  SET_WEATHER_LOADING
} from './../types';

const NewsState = props => {
  const initialState = {
    single: {},
    news: {
      general: [],
      business: [],
      health: [],
      science: [],
      technology: [],
      entertainment: [],
      sports: []
    },
    loading: false,
    weather: {
      loading: false,
      timezone: null,
      summary: null,
      temperature: null,
      icon: null
    }
  };

  const [state, dispatch] = useReducer(NewsReducer, initialState);

  window.addEventListener('DOMContentLoaded', event => {
    if (navigator.geolocation) {
      setWeatherLoading();
      navigator.geolocation.getCurrentPosition(position => {
        // console.log(position);
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        const proxy = `https://cors-anywhere.herokuapp.com/`;
        const api = `${proxy}https://api.darksky.net/forecast/742a7d03bb25b54ff0ab06bd8eb58369/${lat},${long}`;

        let weather = {
          timezone: null,
          summary: null,
          temperature: null,
          icon: null
        };

        fetch(api)
          .then(data => data.json())
          .then(data => {
            // console.log(data);
            const { temperature, summary, icon } = data.currently;
            const timezone = data.timezone;
            weather.temperature = temperature;
            weather.summary = summary;
            weather.icon = icon;
            weather.timezone = timezone;
            // console.log(weather);
            dispatch({
              type: SET_LOCATION,
              payload: weather
            });
          });
      });
    }

    setLoading();
    //   // Go to db and get news and put into state and save the date of the last update
    (async function() {
      const news = {
        general: [],
        business: [],
        entertainment: [],
        health: [],
        science: [],
        technology: [],
        sports: []
      };
      let res = [];
      await axios
        .get('http://localhost:5000/api/news')
        .then(response => {
          res = [...response.data];
        })
        .catch(error => {
          console.log(error);
        });

      res.forEach(article => {
        news[`${article.category}`].push(article);
      });

      dispatch({
        type: FETCH_NEWS,
        payload: news
      });
    })();
  });

  //Set loading
  const setLoading = () => dispatch({ type: SET_LOADING });
  const setWeatherLoading = () => dispatch({ type: SET_WEATHER_LOADING });

  return (
    <NewsContext.Provider
      value={{
        news: state.news,
        loading: state.loading,
        setLoading,
        weather: state.weather
      }}>
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsState;
