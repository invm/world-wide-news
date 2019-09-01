import {
  FETCH_NEWS,
  SET_LOADING,
  SET_LOCATION,
  SET_WEATHER_LOADING
} from './../types';

export default (state, action) => {
  switch (action.type) {
    case FETCH_NEWS:
      return {
        ...state,
        news: { ...action.payload },
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_WEATHER_LOADING:
      return {
        ...state,
        weather: {
          loading: true
        }
      };
    case SET_LOCATION:
      return {
        ...state,
        weather: {
          loading: false,
          timezone: action.payload.timezone,
          summary: action.payload.summary,
          temperature: action.payload.temperature,
          icon: action.payload.icon
        }
      };
    default:
      return state;
  }
};
