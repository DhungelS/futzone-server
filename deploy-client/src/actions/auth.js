import jwtDecode from 'jwt-decode';
import {
  setAuthToken,
  authSuccess,
  authRequest,
  authError,
  clearAuth
} from './actionTypes';
import { saveAuthToken, clearAuthToken } from '../local-storage';
import {API_BASE_URL} from '../../src/config';
import axios from 'axios';


const storeAuthInfo = (authToken, dispatch) => {
  const decodedToken = jwtDecode(authToken);
  dispatch(setAuthToken(authToken));
  dispatch(authSuccess(decodedToken));
  saveAuthToken(authToken);
};

export const registerUser = user => dispatch => {
  console.log(user);
  return fetch(`${API_BASE_URL}/signup/`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json());
};


export const login = loginInfo => dispatch => {
  console.log(loginInfo)
  console.log('line 16');
  dispatch(authRequest());
  return axios({
    url: `${API_BASE_URL}/login/`,
    method: 'POST',
    headers: {
      'content-Type': 'application/json'
    },
    data: JSON.stringify(loginInfo)
  }).then(response => {
    console.log(response)
    storeAuthInfo(response.data.authToken, dispatch);
  });
};

export const refreshAuthToken = () => (dispatch, getState) => {
  dispatch(authRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/login/local/refresh`, {
    method: 'POST',
    headers: {
      // Provide our existing token as credentials to get a new one
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => res.json())
    .then(({ authToken }) => storeAuthInfo(authToken, dispatch))
    .catch(err => {
      // We couldn't get a refresh token because our current credentials
      // are invalid or expired, or something else went wrong, so clear
      // them and sign us out
      dispatch(authError(err));
      dispatch(clearAuth());
      clearAuthToken(authToken);
    });
};

