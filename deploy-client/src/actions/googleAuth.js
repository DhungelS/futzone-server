import axios from 'axios';
import {FETCH_GOOGLE_USER_REQUEST, FETCH_GOOGLE_USER_SUCCESS, FETCH_GOOGLE_USER_ERROR} from './actionTypes'
export const fetchGoogleUser = () => dispatch => {
  dispatch({type: FETCH_GOOGLE_USER_REQUEST})
  axios
    .get('/api/current_user')
    .then(res => dispatch({ type: FETCH_GOOGLE_USER_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: FETCH_GOOGLE_USER_ERROR, payload: err }));
};
