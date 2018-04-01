import axios from 'axios';
import {SOCCER_API_KEY } from '../config';
import {GET_LEAGUES_REQUEST, GET_LEAGUES_SUCCESS, GET_LEAGUES_ERROR, GET_TEAMS_REQUEST, GET_TEAMS_SUCCESS, GET_TEAMS_ERROR, GET_MATCHES_REQUEST, GET_MATCHES_SUCCESS, GET_MATCHES_ERROR} from './actionTypes'
const BASE_URL = 'https://api.football-data.org/v1';


export const getLeagues = () => dispatch => {
  dispatch({ type: GET_LEAGUES_REQUEST });

  axios
    .get(`${BASE_URL}/competitions`, {
      headers: { 'X-Auth-Token': SOCCER_API_KEY }
    })
    .then(res => {
      return dispatch({ type: GET_LEAGUES_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_LEAGUES_ERROR, payload: err }));
};

export const getTeams = url => dispatch => {
  dispatch({ type: GET_TEAMS_REQUEST });
  axios
    .get(url, {
      headers: { 'X-Auth-Token': SOCCER_API_KEY }
    })
    .then(res => {
      return dispatch({
        type: GET_TEAMS_SUCCESS,
        payload: res.data.teams
      });
    })
    .catch(err => dispatch({ type: GET_TEAMS_ERROR, payload: err }));
};

export const getMatches = url => dispatch => {
  dispatch({ type: GET_MATCHES_REQUEST });

  axios
    .get(url, {
      headers: { 'X-Auth-Token': SOCCER_API_KEY }
    })
    .then(res => {
      return dispatch(getFinishedMatches(res.data.fixtures));
    })
    .catch(err => dispatch({ type: GET_MATCHES_ERROR, payload: err }));
};

const getFinishedMatches = data => {
  const finished = data.filter(el => el.status === 'FINISHED');
  const last4Ele = finished.slice(finished.length - 4, finished.length);
  return {
    type: GET_MATCHES_SUCCESS,
    payload: last4Ele
  };
};
