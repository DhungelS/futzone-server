import axios from 'axios';
import { YOUTUBE_API_KEY, SOCCER_API_KEY } from '../config';

const BASE_URL = 'https://api.football-data.org/v1';

export const fetchUser = () => dispatch => {
  axios
    .get('/api/current_user')
    .then(res => dispatch({ type: 'FETCH_USER_SUCCESS', payload: res.data }))
    .catch(err => dispatch({ type: 'FETCH_USER_ERROR', payload: err }));
};

export const fetchReviewData = id => dispatch => {
  axios
    .get(`/api/reviews/${id}`)
    .then(res =>
      dispatch({ type: 'FETCH_REVIEW_DATA_SUCCESS', payload: res.data })
    )
    .catch(err =>
      dispatch({ type: 'FETCH_REVIEW_DATA_FAILURE', payload: err })
    );
};

export const postReviewData = values => (dispatch, getState) => {
  const user = getState().auth.userData;
  axios
    .post('/api/reviews', values)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: 'CREATE_REVIEW_DATA_SUCCESS',
        payload: {
          ...res.data,
          _user: user
        }
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: 'CREATE_REVIEW_DATA_FAILURE',
        payload: err
      });
    });
};

export const deleteReviewItem = id => dispatch => {
  axios
    .delete(`/api/reviews/${id}`)
    .then(res => dispatch({ type: 'DELETE_REVIEW_ITEM_SUCCESS', payload: id }))
    .catch(err =>
      dispatch({ type: 'DELETE_REVIEW_ITEM_FAILURE', payload: err })
    );
};

export const updateReviewItem = (id, values) => dispatch => {
  axios
    .put(`/api/reviews/${id}`, values)
    .then(res => {
      dispatch({
        type: 'UPDATE_REVIEW_ITEM_SUCCESS',
        payload: {
          ...res.data,
          id
        }
      });
    })
    .catch(err =>
      dispatch({ type: 'UPDATE_REVIEW_ITEM_FAILURE', payload: err })
    );
};

export const getLeagues = () => dispatch => {
  dispatch({ type: 'GET_LEAGUES_REQUEST' });

  axios
    .get(`${BASE_URL}/competitions`, {
      headers: { 'X-Auth-Token': SOCCER_API_KEY }
    })
    .then(res => {
      return dispatch({ type: 'GET_LEAGUES_SUCCESS', payload: res.data });
    })
    .catch(err => dispatch({ type: 'GET_LEAGUES_ERROR', payload: err }));
};

export const getTeams = (url, leagueId) => (dispatch, getState) => {
  dispatch({ type: 'GET_TEAMS_REQUEST' });

  const { teamData } = getState().soccerData;

  if (teamData[leagueId] && teamData[leagueId].length > 0) {
    dispatch({ type: 'TEAM_ALREADY_HERE' });
    return;
  }

  axios
    .get(url, {
      headers: { 'X-Auth-Token': SOCCER_API_KEY }
    })
    .then(res => {
      return dispatch({
        type: 'GET_TEAMS_SUCCESS',
        payload: res.data.teams,
        leagueId
      });
    })
    .catch(err => dispatch({ type: 'GET_TEAMS_ERROR', payload: err }));
};

export const getMatches = url => dispatch => {
  dispatch({ type: 'GET_MATCHES_REQUEST' });

  axios
    .get(url, {
      headers: { 'X-Auth-Token': SOCCER_API_KEY }
    })
    .then(res => {
      return dispatch(getFinishedMatches(res.data.fixtures));
    })
    .catch(err => dispatch({ type: 'GET_MATCHES_ERROR', payload: err }));
};

const getFinishedMatches = data => {
  const finished = data.filter(el => el.status === 'FINISHED');
  const last4Ele = finished.slice(finished.length - 4, finished.length);
  return {
    type: 'GET_MATCHES_SUCCESS',
    payload: last4Ele
  };
};

export const getHighlightVids = match => dispatch => {
  dispatch({ type: 'GET_HIGHLIGHTS_REQUEST' });
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
        type: 'GET_HIGHLIGHTS_SUCCESS',
        payload: res.data.items
      });
    })
    .catch(err => {
      return dispatch({ type: 'GET_HIGHLIGHTS_ERROR', payload: err });
    });
};
