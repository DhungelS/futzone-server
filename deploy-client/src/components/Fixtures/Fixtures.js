import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';

import Matches from './Matches/Matches';
import Teams from './Teams/Teams';
import Search from './Search/Search';
import Highlights from './Highlights/Highlights';
import * as actions from '../../actions';
import './Fixtures.css';
import { generateMatchId } from '../../Utils/generateMatchId';

import { CustomModal } from '../Modal';

export class Fixtures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTeams: false,
      selectedLeague: '',
      openReviewModal: false,
      openSecondModal: false,
      selectedMatch: null,
      handlingUpdateReview: false,
      matchToUpdateId: null,
      moment: '',
      rating: 1,
      term: '',
      searchs: '',
    };
  }

  componentDidMount() {
    this.props.getLeagues();
  }

  onOpenReviewModal = match => {
    this.setState({ openReviewModal: true, selectedMatch: match });
    this.props.fetchReviewData(generateMatchId(match));
  };

  onCloseReviewModal = () => {
    this.setState({ openReviewModal: false, isEditMode: false });
  };

  onOpenSecondModal = highlightVids => {
    this.setState({ openSecondModal: true });
    this.props.getHighlightVids(highlightVids);
  };

  onCloseSecondModal = () => {
    this.setState({ openSecondModal: false });
  };

  handleLeagueSelect(link, id) {
    this.setState(
      {
        showTeams: true,
        selectedLeague: id,
      },
      () => {
        this.props.getTeams(link, id);
      },
    );
  }

  handleTeamSelect(link) {
    this.props.getMatches(link);
  }

  updateReview = review => {
    console.log('====================================');
    console.log('IM UPDATEING', review);
    console.log('====================================');
    this.props.updateReviewItem(this.state.matchToUpdateId, {
      moment: review.moment,
      rating: review.rating,
    });
  };

  reviewPostHandler = () => {
    if (!this.state.selectedMatch) {
      return;
    }

    if (this.state.handlingUpdateReview) {
      this.props.updateReviewItem(this.state.matchToUpdateId, {
        moment: this.state.moment,
        rating: this.state.rating,
      });
    } else {
      this.props.postReviewData({
        match: generateMatchId(this.state.selectedMatch),
        moment: this.state.moment,
        rating: this.state.rating,
      });
    }

    this.setState({
      moment: '',
      rating: 1,
    });
  };

  reviewDeleteHandler = delId => {
    this.props.deleteReviewItem(delId);
  };

  _searchFilterAndMapLeagueItems = (searchTerm, itemtoFilter) => {
    const searchs = itemtoFilter
      .map((league, index) => {
        const modifiedLink =
          league._links.teams.href.substr(0, 4) +
          's' +
          league._links.teams.href.substr(4);

        return (
          <li
            key={league.id}
            onClick={() => this.handleLeagueSelect(modifiedLink, league.id)}
            className="league"
          >
            <a className="league-caption">{league.caption}</a>
          </li>
        );
      })
      .filter(league =>
        league.props.children.props.children
          .toUpperCase()
          .includes(searchTerm.toUpperCase()),
      );

    this.setState({
      term: searchTerm,
      searchs,
    });
  };

  render() {
    const matches = this.props.matches.map((match, index) => {
      return (
        <div key={index}>
          <Matches
            key={index}
            match={match}
            onOpenReviewModal={() => this.onOpenReviewModal(match)}
            onOpenSecondModal={() =>
              this.onOpenSecondModal(` ${match.homeTeamName} vs ${
                match.awayTeamName
              }
              `)
            }
          />
        </div>
      );
    });

    return (
      <main className="fixtures" role="main">
        <Search
          searchAndFilter={e =>
            this._searchFilterAndMapLeagueItems(
              e.target.value,
              this.props.leagues,
            )
          }
          value={this.state.term}
        />
        <div className="list">
          <ul className="leagues-list">{this.state.searchs}</ul>

          <ul className="match-list">{matches}</ul>

          <ul className="teams-list">
            {this.state.showTeams &&
              this.props.teams[this.state.selectedLeague] &&
              this.props.teams[this.state.selectedLeague].map((team, index) => (
                <Teams
                  key={index}
                  team={team}
                  handleTeamSelect={link => this.handleTeamSelect(link)}
                />
              ))}
          </ul>
        </div>
        {this.state.selectedMatch && (
          <CustomModal
            params={{
              reviewPostHandler: this.reviewPostHandler,
              reviews: this.props.reviews,
              reviewDeleteHandler: this.reviewDeleteHandler,
              updateReview: this.updateReview,
            }}
            modalType="REVIEW"
            handleClose={this.onCloseReviewModal}
            isOpen={this.state.openReviewModal}
          />
        )}

        <Modal
          classNames={{
            overlay: 'custom-overlay',
            modal: 'custom-modal',
          }}
          open={this.state.openSecondModal}
          onClose={this.onCloseSecondModal}
          little
        >
          <Highlights matchSelected={this.state.selectedMatch} />
        </Modal>
      </main>
    );
  }
}
const mapStateToProps = state => ({
  leagues: state.soccerData.leagueData,
  teams: state.soccerData.teamData,
  matches: state.soccerData.matchData,
  reviews: state.review.reviewData,
  auth: state.auth.userData,
});

export default connect(mapStateToProps, actions)(Fixtures);
