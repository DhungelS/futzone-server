import React from 'react';

export default function Leagues(props) {
  console.log(props)
  return (
    <li
      key={props.league.id}
      onClick={() => props.handleLeagueSelect(props.league._links.teams.href)}
      className="league"
    >
      <a className="league-caption">{props.league.caption}</a>
    </li>
  );
}
