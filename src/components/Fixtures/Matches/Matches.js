import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { bounceInUp } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import { Card } from 'antd';
import { Button } from 'antd';
import '../Fixtures.css';
import './Matches.css'
import * as actions from '../../../actions';



export function Matches(props) {

  return (
    <StyleRoot>
    <Card key={props.key} title={`${props.match.homeTeamName} VS. ${props.match.awayTeamName}`} style={{padding: '6px', textAlign: 'center'}} >
      
      <p className="match-item goals">{props.match.result.goalsHomeTeam} - {props.match.result.goalsAwayTeam}</p>
      <p className="match-date">
        on <Moment>{props.match.date}</Moment>
      </p>
      <Button
       size="large"
        type="primary"
        onClick={() => props.onOpenReviewModal(`${props.match.homeTeamName} VS. ${props.match.awayTeamName}`,`${props.match.homeTeamName}-${props.match.awayTeamName}${props.match.date}`)}
      >
        Reviews
      </Button>
      <Button
      style={{marginLeft: '10px'}}
      size="large"
      type="secondary"
        onClick={() => {
          props.onOpenHighlightsModal(`${props.match.homeTeamName} vs.${props.match.awayTeamName}`);
        }}
      >
        Highlights
      </Button>
    </Card>
    </StyleRoot>
  );
}

const mapStateToProps = (state, ownProps) => ({
  match: ownProps.match,
  onOpenFirstModal: ownProps.onOpenFirstModal,
  onOpenSecondModal: ownProps.onOpenSecondModal
});

export default connect(mapStateToProps, actions)(Matches);
