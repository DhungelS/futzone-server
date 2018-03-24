const initialState = {
  leagueData: [],
  teamData: [],
  matchData: [],
};

export default function(state = initialState, action) {
  switch(action.type){
    case 'GET_LEAGUES_SUCCESS':
    return {
      ...state,
      leagueData: action.payload
    }
    case 'GET_TEAMS_SUCCESS': 
    return{
      ...state,
      teamData: action.payload
    }
    case 'GET_MATCHES_SUCCESS':
    return {
      ...state,
      matchData: action.payload
    }
    default: {
        return state
    }
  }
}
