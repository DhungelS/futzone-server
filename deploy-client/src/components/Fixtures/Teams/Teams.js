import React from 'react';
import backupLogo from './backupImage/ball.png'

export default function Teams(props) {
  return (
    <li className="team" onClick={() => props.handleTeamSelect(props.team._links.fixtures.href)}>
     <img src={props.team.crestUrl}  onError={(e)=>{e.target.src=backupLogo}} className="crest" alt="Team crest"/>
      {props.team.name}
    </li>
  );
}
