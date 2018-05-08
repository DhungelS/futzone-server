import axios from 'axios';
import { YOUTUBE_API_KEY} from '../config';
import {GET_HIGHLIGHTS_REQUEST,  GET_HIGHLIGHTS_SUCCESS, GET_HIGHLIGHTS_ERROR } from './actionTypes'

export const getHighlightVids = match => dispatch => {
  dispatch({ type: GET_HIGHLIGHTS_REQUEST });
  axios
    .get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        q: match,
        key: YOUTUBE_API_KEY,
        part: 'snippet',
        maxResults: 4
      }
    })
    .then(res => {
      return dispatch({
        type: GET_HIGHLIGHTS_SUCCESS,
        payload: res.data.items
      });
    })
    .catch(err => {
      return dispatch({ type: GET_HIGHLIGHTS_ERROR, payload: err });
    });
};
