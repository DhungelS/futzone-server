import React from 'react';
import backupLogo from './backupImage/ball.png'
import { bounceInRight } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const styles = {
  bounceInRight: {
    animation: 'x 1s',
    animationName: Radium.keyframes(bounceInRight, 'bounceInRight')
  }
}

export default function Teams(props) {
  const modifiedLink = props.team._links.fixtures.href.substr(0, 4) + "s" +props.team._links.fixtures.href.substr(4);
  return (
    <StyleRoot>
    <li className="team" style={styles.bounceInRight} onClick={() => props.handleTeamSelect(modifiedLink)}>
     <img src={props.team.crestUrl}  onError={(e)=>{e.target.src=backupLogo}} className="crest" alt="Team crest"/>
      {props.team.name}
    </li>
    </StyleRoot>
  );
}
