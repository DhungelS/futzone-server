import React from 'react';
import { bounceInLeft } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const styles = {
  bounceInLeft: {
    animation: 'x 1s',
    animationName: Radium.keyframes(bounceInLeft, 'bounceInLeft')
  }
}

export default function Leagues(props) {
  return (
    <StyleRoot>
    <li
      key={props.league.id}
      style={styles.bounceInLeft}
      onClick={() => props.handleLeagueSelect(props.league._links.teams.href)}
      className="league"
    >
      <a className="league-caption">{props.league.caption}</a>
    </li>
     </StyleRoot>
  );
}
