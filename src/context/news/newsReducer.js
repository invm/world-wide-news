import {
  FETCH_NEWS,
  UPDATE_NEWS,
  SET_LOADING,
  SET_ALERT,
  REMOVE_ALERT
} from './../types';

export default (state, action) => {
  switch (action.type) {
    case FETCH_NEWS:
      return {
        ...state,
        news: { ...action.payload },
        loading: false
      };
    // case UPDATE_NEWS:
    //   return {
    //     ...state,
    //     newerNews: action.payload,
    //     loading: false
    //   };
    // case SET_ALERT:
    //   return {
    //     ...state,
    //     news: [],
    //     loading: false
    //   };
    // case REMOVE_ALERT:
    //   return {
    //     ...state,
    //     news: action.payload,
    //     loading: false
    //   };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
