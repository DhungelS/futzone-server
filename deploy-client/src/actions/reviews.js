import axios from 'axios'

import {FETCH_REVIEW_DATA_REQUEST, FETCH_REVIEW_DATA_SUCCESS, FETCH_REVIEW_DATA_ERROR, FETCH_ALL_REVIEW_DATA_REQUEST, FETCH_ALL_REVIEW_DATA_SUCCESS, FETCH_ALL_REVIEW_DATA_ERROR, CREATE_REVIEW_DATA_REQUEST, CREATE_REVIEW_DATA_SUCCESS, CREATE_REVIEW_DATA_ERROR, UPDATE_REVIEW_ITEM_REQUEST, UPDATE_REVIEW_ITEM_SUCCESS, UPDATE_REVIEW_ITEM_ERROR, DELETE_REVIEW_ITEM_REQUEST, DELETE_REVIEW_ITEM_SUCCESS, DELETE_REVIEW_ITEM_ERROR} from './actionTypes'
import {API_BASE_URL} from '../../src/config';

export const fetchReviewData = id => (dispatch, getState) => {
  dispatch({type: FETCH_REVIEW_DATA_REQUEST})
  const authToken = getState().auth.authToken;
  axios
    .get(`${API_BASE_URL}/api/reviews/${id}`, {headers: {Authorization: `Bearer ${authToken}`}})
    .then(res =>
      dispatch({ type: FETCH_REVIEW_DATA_SUCCESS, payload: res.data })
    )
    .catch(err =>
      dispatch({ type: FETCH_REVIEW_DATA_ERROR, payload: err })
    );
};

export const fetchAllReviewData = () => (dispatch, getState) => {
  dispatch({type: FETCH_ALL_REVIEW_DATA_REQUEST})
  const authToken = getState().auth.authToken;
  axios
    .get(`${API_BASE_URL}/api/reviews/`, {headers: {Authorization: `Bearer ${authToken}`}})
    .then(res =>
      dispatch({
        type: FETCH_ALL_REVIEW_DATA_SUCCESS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({ type: FETCH_ALL_REVIEW_DATA_ERROR, palyoad: err })
    )
}

export const postReviewData = values => (dispatch, getState) => {
  dispatch({type: CREATE_REVIEW_DATA_REQUEST})
  const authToken = getState().auth.authToken;
  const user = getState().auth.userData;
  axios
    .post(`${API_BASE_URL}/api/reviews`, values, {headers: {Authorization: `Bearer ${authToken}`}})
    .then(res => {
      console.log(res.data);
      dispatch({
        type: CREATE_REVIEW_DATA_SUCCESS,
        payload: {
          ...res.data
        }
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: CREATE_REVIEW_DATA_ERROR,
        payload: err
      });
    });
};


export const updateReviewItem = (id, values) => (dispatch, getState) => {
  dispatch({type: UPDATE_REVIEW_ITEM_REQUEST})
  const authToken = getState().auth.authToken;
  axios
    .put(`${API_BASE_URL}/api/reviews/${id}`, values, {headers: {Authorization: `Bearer ${authToken}`}})
    .then(res => {
      dispatch({
        type: UPDATE_REVIEW_ITEM_SUCCESS,
        payload: {
          ...res.data,
          id
        }
      });
    })
    .catch(err =>
      dispatch({ type: UPDATE_REVIEW_ITEM_ERROR, payload: err })
    );
};

export const deleteReviewItem = id => (dispatch, getState) => {
  dispatch({type: DELETE_REVIEW_ITEM_REQUEST})
  const authToken = getState().auth.authToken;
  axios
    .delete(`${API_BASE_URL}/api/reviews/${id}`, {headers: {Authorization: `Bearer ${authToken}`}})
    .then(res => dispatch({ type: DELETE_REVIEW_ITEM_SUCCESS, payload: id }))
    .catch(err =>
      dispatch({ type: DELETE_REVIEW_ITEM_ERROR, payload: err })
    );
};
