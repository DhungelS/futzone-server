import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { bounceInUp } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

import '../Fixtures.css';
import * as actions from '../../../actions';

const styles = {
  bounceInUp: {
    animation: 'x 1s',
    animationName: Radium.keyframes(bounceInUp, 'bounceInUp')
  }
}

export function Matches(props) {

  return (
    <StyleRoot>
    <li key={props.key}className="match" style={styles.bounceInUp}>
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
    </StyleRoot>
  );
}

const mapStateToProps = (state, ownProps) => ({
  match: ownProps.match,
  onOpenFirstModal: ownProps.onOpenFirstModal,
  onOpenSecondModal: ownProps.onOpenSecondModal
});

export default connect(mapStateToProps, actions)(Matches);
