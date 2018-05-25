import React, { Component } from 'react';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; //
import 'react-confirm-alert/src/react-confirm-alert.css';
import { List, Spin} from 'antd';

import ReviewsModal from './ReviewsModal/ReviewsModal';
import HighlightsModal from './HighlightsModal/HighlightsModal';
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
      matchId: null,
      selectedMatch: null,
      review: '',
      rating: 1,
      searchTerm: ''
    };
  }

  componentDidMount() {
    this.props.getLeagues();
  }

  onOpenReviewModal = (selectedMatch, matchId) => {
    const reviewModal = (selectedMatch, matchId) => {
      this.props.fetchReviewData(matchId);
      this.setState({ openReviewModal: true, selectedMatch, matchId });
    };

    const reviewAccess = () => {
      confirmAlert({
        title: 'Login',
        message: 'You must login to access this feature.',
        buttons: [
          {
            label: 'Ok'
          }
        ]
      });
    };

    this.props.auth ? reviewModal(selectedMatch, matchId) : reviewAccess();
  };

  onCloseReviewModal = () => {
    this.setState({ openReviewModal: false });
  };

  onOpenHighlightsModal = match => {
    this.props.getHighlightVids(match);
    this.setState({ openHighlightsModal: true });
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
      rating: this.state.rating,
      matchId: this.state.matchId
    });

    this.setState({
      review: '',
      rating: 1
    });
  };

  reviewDeleteHandler(delId) {
    this.props.deleteReviewItem(delId);
  }

  render() {
    let filtered = this.props.leagues.filter(league => {
      return league.caption
        .toUpperCase()
        .includes(this.state.searchTerm.toUpperCase());
    });

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
        <div className="test">
          {/* <ul className="leagues-list">
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
          </ul> */}

       <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
            className="test-list"
            locale={{emptyText: null}}
            dataSource={filtered}
            renderItem={(league, index) => (
              <List.Item>
                <Leagues
                  key={index}
                  identifer={index}
                  league={league}
                  handleLeagueSelect={this.handleLeagueSelect}
                />
              </List.Item>
            )}
          />

          {/* <ul className="test-list">
            {this.props.matches.map((match, index) => (
              <Matches
                key={index}
                match={match}
                onOpenReviewModal={this.onOpenReviewModal}
                onOpenHighlightsModal={this.onOpenHighlightsModal}
              />
            ))}
          </ul> */}
          {this.props.matches.length > 0 ?<List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
            dataSource={this.props.matches}
            locale={{emptyText: null}}
            className="test-list"
            renderItem={(match, index) => (
              <List.Item>
               <Matches
                key={index}
                match={match}
                onOpenReviewModal={this.onOpenReviewModal}
                onOpenHighlightsModal={this.onOpenHighlightsModal}
              />
              </List.Item>
            )}
          />: <div className="empty"> </div>}
            
         {this.props.teams.length > 0 ? <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
            dataSource={this.props.teams}
            className="test-list"
            renderItem={(team, index) => (
              <List.Item>
                <Teams
                  key={index}
                  team={team}
                  handleTeamSelect={link => this.handleTeamSelect(link)}
                />
              </List.Item>
            )}
          />: <div className="empty"> </div>}

          {/* <ul className="teams-list">
            {this.state.showTeams &&
              this.props.teams.map((team, index) => (
                <Teams
                  key={index}
                  team={team}
                  handleTeamSelect={link => this.handleTeamSelect(link)}
                />
              ))}
          </ul> */}
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
          highlightsVids={this.props.highlights}
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
  auth: state.auth.currentUser
});

export default connect(mapStateToProps, actions)(Fixtures);
