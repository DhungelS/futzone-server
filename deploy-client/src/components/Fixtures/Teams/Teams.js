import React from 'react';
import backupLogo from './backupImage/ball.png'

export default function Teams(props) {
  const modifiedLink = props.team._links.fixtures.href.substr(0, 4) + "s" +props.team._links.fixtures.href.substr(4);
  return (
    <li className="team" onClick={() => props.handleTeamSelect(modifiedLink)}>
     <img src={props.team.crestUrl}  onError={(e)=>{e.target.src=backupLogo}} className="crest" alt="Team crest"/>
      {props.team.name}
    </li>
  );
}
