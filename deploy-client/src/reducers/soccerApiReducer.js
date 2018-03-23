const initialState = {
  leagueData: [],
  teamData: [],
  matchData: [],
};

export default function(state = initialState, action) {
  console.log(action);
  if (action.type === 'GET_LEAGUES_SUCCESS') {
    return {
      ...state,
      leagueData: action.payload
    };
  } else if (action.type === 'GET_TEAMS_SUCCESS') {
    return {
      ...state,
      teamData: action.payload
    };
  }
  else if (action.type === 'GET_MATCHES_SUCCESS')
  return {
      ...state,
      matchData: action.payload
  };

  return state;
}
