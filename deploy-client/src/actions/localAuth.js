import axios from 'axios';
import {
  SIGNUP_LOCAL_USER_REQUEST,
  SIGNUP_LOCAL_USER_SUCCESS,
  SIGNUP_LOCAL_USER_ERROR,
  LOGIN_LOCAL_USER_REQUEST,
  LOGIN_LOCAL_USER_SUCCESS,
  LOGIN_LOCAL_USER_ERROR
} from './actionTypes';

export const localSignUp = userObj => dispatch => {
  dispatch({ type: SIGNUP_LOCAL_USER_REQUEST });
  axios
    .post('/api/users', userObj)
    .then(res =>
      dispatch({ type: SIGNUP_LOCAL_USER_SUCCESS, payload: res.data })
    )
    .catch(err => dispatch({ type: SIGNUP_LOCAL_USER_ERROR, payload: err }));
};

export const localLoginIn = userObj => dispatch => {
  dispatch({type: LOGIN_LOCAL_USER_REQUEST})
  axios
    .post('/api/login', userObj)
    .then(res => dispatch({ type: LOGIN_LOCAL_USER_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: LOGIN_LOCAL_USER_ERROR, payload: err }));
};
