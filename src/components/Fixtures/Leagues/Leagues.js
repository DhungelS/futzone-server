import React from 'react';
import { bounceInLeft } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import { Card } from 'antd';


const alignStyle = {
  textAlign: 'center'
}


export default function Leagues(props) {
  
  const modifiedLink = props.league._links.teams.href.substr(0, 4) + "s" +props.league._links.teams.href.substr(4);


  console.log(props.identifer)

  return (
    <StyleRoot>
    <Card
      key={props.league.id}
      className="test-league-item"
      onClick={() => props.handleLeagueSelect(modifiedLink)}
      hoverable={true}
      title={props.league.caption}
      style={props.identifer % 2 !== 0 ? {...alignStyle, backgroundColor: 'black'}: {...alignStyle}} 
    >
    </Card>
     </StyleRoot>
  );
}
