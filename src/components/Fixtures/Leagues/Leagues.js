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
  const modifiedLink = props.league._links.teams.href.substr(0, 4) + "s" +props.league._links.teams.href.substr(4);
  return (
    <StyleRoot>
    <li
      key={props.league.id}
      style={styles.bounceInLeft}
      onClick={() => props.handleLeagueSelect(modifiedLink)}
      className="league"
    >
      <a className="league-caption">{props.league.caption}</a>
    </li>
     </StyleRoot>
  );
}
