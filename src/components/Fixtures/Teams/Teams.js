import React from 'react';
import backupLogo from './backupImage/ball.png';
import { Card } from 'antd';

export default function Teams(props) {
  const modifiedLink =
    props.team._links.fixtures.href.substr(0, 4) +
    's' +
    props.team._links.fixtures.href.substr(4);
  return (
    // <li className="team"  onClick={() => props.handleTeamSelect(modifiedLink)}>
    //  <img src={props.team.crestUrl}  onError={(e)=>{e.target.src=backupLogo}} className="crest" alt="Team crest"/>
    //   {props.team.name}
    // </li>

    <Card
      key={props.team.id}
      title={props.team.name}
      className="team-card"
      onClick={() => props.handleTeamSelect(modifiedLink)}
      style={{padding: '10px', textAlign: 'center'}}
    >
      <img
        src={props.team.crestUrl}
        onError={e => {
          e.target.src = backupLogo;
        }}
        className="crest"
        alt="Team crest"
      />
    </Card>
  );
}
