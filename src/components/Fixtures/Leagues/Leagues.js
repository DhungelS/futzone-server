import React from 'react';
import { Card } from 'antd';


const alignStyle = {
  textAlign: 'center'
}


export default function Leagues(props) {
  
  const modifiedLink = props.league._links.teams.href.substr(0, 4) + "s" +props.league._links.teams.href.substr(4);



  return (
   
    <Card
      key={props.league.id}
      className="test-league-item"
      onClick={() => props.handleLeagueSelect(modifiedLink)}
      hoverable={true}
      title={props.league.caption}
      style={props.identifer % 2 !== 0 ? {...alignStyle, backgroundColor: 'black'}: {...alignStyle}} 
    >
    </Card>

  );
}
