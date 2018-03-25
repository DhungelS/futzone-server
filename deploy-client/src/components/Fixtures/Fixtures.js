import React, { Component } from 'react';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // 
import 'react-confirm-alert/src/react-confirm-alert.css' 

import  ReviewsModal  from './ReviewsModal/ReviewsModal';
import  HighlightsModal  from './HighlightsModal/HighlightsModal';
import Matches from './Matches/Matches';
import Leagues from './Leagues/Leagues';
import Teams from './Teams/Teams';
import Search from './Search/Search';
import * as actions from '../../actions';
import './Fixtures.css';

export class Fixtures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTeams: false,
      openReviewModal: false,
      openHighlightsModal: false,
      selectedMatch: null,
      review: '',
      rating: 1,
      searchTerm: '',
    };
  }

  componentDidMount() {
    this.props.getLeagues();
  }

  onOpenReviewModal = match => {

    const reviewModal  = (_match) => {
    this.props.fetchReviewData(match);
    this.setState({ openReviewModal: true, selectedMatch: match })
    }

    const reviewAccess = () => {
      confirmAlert({
        title: 'Login',
        message: 'You must login to access this feature.',
        buttons: [
          {
            label: 'Ok'
          },
        ]
      })
    };

    this.props.auth ? reviewModal(match) : reviewAccess()
  }

  


  onCloseReviewModal = () => {
    this.setState({ openReviewModal: false });
  };

  onOpenHighlightsModal = match => {
    console.log(match)
    this.props.getHighlightVids(match);
    this.setState({ openHighlightsModal: true});
  };

  onCloseHighlightsModal = () => {
    this.setState({ openHighlightsModal: false });
  };

  handleLeagueSelect = link => {
    this.setState(
      {
        showTeams: true
      },
      () => {
        this.props.getTeams(link);
      }
    );
  };

  handleTeamSelect(link) {
    this.props.getMatches(link);
  }

  reviewPostHandler = event => {
    event.preventDefault();
    if (!this.state.selectedMatch) {
      return;
    }

    this.props.postReviewData({
      match: this.state.selectedMatch,
      moment: this.state.review,
      rating: this.state.rating
    });

    this.setState({
      review: '',
      rating: 1
    });
  }

  reviewDeleteHandler(delId) {
    this.props.deleteReviewItem(delId);
  }

  render() {
    return (
      <main className="fixtures" role="main">
        <Search
          searchAndFilter={event =>
            this.setState({
              searchTerm: event.target.value
            })
          }
          value={this.state.searchTerm}
        />
        <div className="list">
          <ul className="leagues-list">
            {this.props.leagues
              .map((league, index) => (
                <Leagues
                  key={index}
                  league={league}
                  handleLeagueSelect={this.handleLeagueSelect}
                />
              ))
              .filter(league =>
                league.props.league.caption
                  .toUpperCase()
                  .includes(this.state.searchTerm.toUpperCase())
              )}
            {this.state.searchs}
          </ul>

          <ul className="match-list">
            {this.props.matches
              .map((match, index) => (
                <Matches
                  key={index}
                  match={match}
                  onOpenReviewModal={this.onOpenReviewModal}
                  onOpenHighlightsModal={ this.onOpenHighlightsModal}
                />
              ))
              }
          </ul>

         
          <ul className="teams-list">
            {this.state.showTeams &&
              this.props.teams.map((team, index) => (
                <Teams
                  key={index}
                  team={team}
                  handleTeamSelect={link => this.handleTeamSelect(link)}
                />
              ))}
          </ul>
         
        </div>

        <ReviewsModal
          selectedMatch={this.state.selectedMatch}
          openReviewModal={this.state.openReviewModal}
          onCloseReviewModal={this.onCloseReviewModal}
          review={this.state.review}
          setReviewValue={e => this.setState({ review: e.target.value })}
          reviewPostHandler={e => this.reviewPostHandler(e)}
          rating={this.state.rating}
          setRatingValue={e => this.setState({ rating: e.target.value })}
          reviewsResponse={this.props.reviews}
          authResponse={this.props.auth}
          reviewDeleteHandler={key => this.reviewDeleteHandler(key)}
        />

        <HighlightsModal
        selectedMatch={this.state.selectedMatch}
        openHighlightsModal={this.state.openHighlightsModal}
        onCloseHighlightsModal={this.onCloseHighlightsModal}
        highlightsVids = {this.props.highlights}
        />
            
      </main>
    );
  }
}
const mapStateToProps = state => ({
  leagues: state.soccerData.leagueData,
  teams: state.soccerData.teamData,
  matches: state.soccerData.matchData,
  reviews: state.review.reviewData,
  highlights: state.highlights.highlightVids,
  auth: state.auth.userData
});

export default connect(mapStateToProps, actions)(Fixtures);
