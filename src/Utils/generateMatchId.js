export function generateMatchId(match){
  return(
    `${match.homeTeamName}-${match.awayTeamName}${match.date}`
  );
  }