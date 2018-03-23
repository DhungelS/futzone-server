import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import '../Fixtures.css';
import {generateMatchId} from '../../../Utils/generateMatchId'

import * as actions from '../../../actions';



export function Matches(props) {
console.log(props.match)
  return (
    <li key={props.key}className="match">
      <b className="match-item">
        {props.match.homeTeamName} <span className="versus">VS.</span>{props.match.awayTeamName}
      </b>
      <p className="match-item goals">{props.match.result.goalsHomeTeam} - {props.match.result.goalsAwayTeam}</p>
      <p className="match-date">
        on <Moment>{props.match.date}</Moment>
      </p>
      <button
        className="modal-btn"
        onClick={() => props.onOpenReviewModal(`${props.match.homeTeamName}-${props.match.awayTeamName}${props.match.date}`)}
      >
        Reviews
      </button>
      <button
      className="modal-btn highlights-modal-btn"
        onClick={() => {
          props.onOpenHighlightsModal(`${props.match.homeTeamName} vs.${props.match.awayTeamName}`);
        }}
      >
        Highlights
      </button>
    </li>
  );
}

const mapStateToProps = (state, ownProps) => ({
  match: ownProps.match,
  onOpenFirstModal: ownProps.onOpenFirstModal,
  onOpenSecondModal: ownProps.onOpenSecondModal
});

export default connect(mapStateToProps, actions)(Matches);
