import {
 GET_LEAGUES_REQUEST,
 GET_LEAGUES_ERROR,
 GET_LEAGUES_SUCCESS,
 GET_TEAMS_ERROR,
 GET_TEAMS_REQUEST,
 GET_TEAMS_SUCCESS,
 GET_MATCHES_REQUEST,
 GET_MATCHES_SUCCESS,
 GET_MATCHES_ERROR
} from '../actions/actionTypes';

const initialState = {
  leagueData: [],
  teamData: [],
  matchData: [],
  loading: false,
  err: null
};

export default function(state = initialState, action) {
  switch(action.type){
    case GET_LEAGUES_REQUEST: 
    return {
      ...state,
      loading: true
    }
    case GET_LEAGUES_SUCCESS:
    return {
      ...state,
      leagueData: action.payload
    }
    case GET_LEAGUES_ERROR: 
    return {
      ...state,
      err: action.payload
    }
    case GET_TEAMS_REQUEST: 
    return {
      ...state,
      loading: true
    }
    case GET_TEAMS_SUCCESS: 
    return{
      ...state,
      teamData: action.payload
    }
    case GET_TEAMS_ERROR: 
    return {
      ...state,
      err: action.payload
    }
    case GET_MATCHES_REQUEST: 
    return {
      ...state,
      loading: true
    }
    case GET_MATCHES_SUCCESS:
    return {
      ...state,
      matchData: action.payload
    }
    case GET_MATCHES_ERROR: 
    return {
      ...state,
      err: action.payload
    }
    default: {
         return state
    }
  }
}
