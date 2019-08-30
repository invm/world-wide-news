import React, { useReducer } from 'react';
import axios from 'axios';
import NewsContext from './newsContext';
import NewsReducer from './newsReducer';
import {
  // FETCH_NEWS,
  // UPDATE_NEWS,
  SET_LOADING,
  FETCH_NEWS
  // SET_ALERT,
  // REMOVE_ALERT
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
    newerNews: false,
    alert: null,
    loading: false
  };

  const [state, dispatch] = useReducer(NewsReducer, initialState);

  window.addEventListener('DOMContentLoaded', event => {
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

    //   // Go to news api and check if there are newer news, if so, display alert to update news
  });

  //   //Search users
  //   const searchUsers = async text => {
  //     setLoading();
  //     const res = await axios.get(
  //       `https://api.github.com/search/users?q=${text}&client_id=
  //       ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
  //       ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //     );
  //     dispatch({
  //       type: SEARCH_USERS,
  //       payload: res.data.items
  //     });
  //   };

  //   //Get single user
  //   const getUser = async username => {
  //     setLoading();
  //     const res = await axios.get(
  //       `https://api.github.com/users/${username}?client_id=
  //       ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
  //       ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //     );
  //     dispatch({ type: GET_USER, payload: res.data });
  //   };

  //   //Get repos
  //   const getUserRepos = async username => {
  //     setLoading();
  //     const res = await axios.get(
  //       `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
  //       ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
  //       ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //     );
  //     dispatch({ type: GET_REPOS, payload: res.data });
  //   };

  //Set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <NewsContext.Provider
      value={{
        news: state.news,
        newerNews: state.newerNews,
        alert: state.alert,
        loading: state.loading
        // setLoading,
        // fetchNews
      }}>
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsState;
