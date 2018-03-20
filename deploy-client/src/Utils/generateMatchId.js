export function generateMatchId(match){
  console.log("genMatchId", match);
  return(
    `${match.homeTeamName}-${match.awayTeamName}${match.date}`
  );
  }