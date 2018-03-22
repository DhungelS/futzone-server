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
      searchs: ''
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
    this.setState({ openReviewModal: false });
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
        selectedLeague: id
      },
      () => {
        this.props.getTeams(link, id);
      }
    );
  }

  handleTeamSelect(link) {
    this.props.getMatches(link);
  }

  reviewPostHandler = event => {
    event.preventDefault();
    if (!this.state.selectedMatch) {
      return;
    }

    if(this.state.handlingUpdateReview){
    this.props.updateReviewItem(this.state.matchToUpdateId,{
      moment: this.state.moment,
      rating: this.state.rating
    });

    }
    
else {
    this.props.postReviewData({
      match: generateMatchId(this.state.selectedMatch),
      moment: this.state.moment,
      rating: this.state.rating
    });
  }

    this.setState({
      moment: '',
      rating: 1
    });
  };

  handleReviewItemSelect = (cardRating, cardMoment, matchToUpdateId) => {
    this.setState({
      rating: cardRating,
      moment: cardMoment,
      handlingUpdateReview: true,
      matchToUpdateId
    });


  };

  reviewDeleteHandler(delId) {
    this.props.deleteReviewItem(delId);
  }

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
          .includes(searchTerm.toUpperCase())
      );

    this.setState({
      term: searchTerm,
      searchs
    });
  };

  render() {
    const reviews = this.props.reviews.map((review, index) => {
      console.log(review);
      return (
        <li
          onClick={() =>
            this.handleReviewItemSelect(
              review.rating,
              review.moment,
              review.match
            )
          }
          className="review-item"
          key={review._id}
        >
          Match: <h4>{review.match}</h4> Rating: <h3>{review.rating}</h3>
          Review: <p>{review.moment}</p>
          User:{' '}
          {this.props.auth._id === review._user._id ? (
            <p> You </p>
          ) : (
            <p> {review._user.name} </p>
          )}
          <div
            className="trash-icon-div"
            onClick={() => this.reviewDeleteHandler(review._id, review.match)}
          >
            {this.props.auth._id === review._user._id ? (
              <i className="fa fa-trash-o fa-fw" />
            ) : null}
          </div>
        </li>
      );
    });

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
              this.props.leagues
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
          <Modal
            classNames={{
              overlay: 'custom-overlay',
              modal: 'custom-modal'
            }}
            open={this.state.openReviewModal}
            onClose={this.onCloseReviewModal}
            little
          >
            <div>
              <h1 className="reviews-heading">Reviews</h1>
              {console.log('one modal')}
              <form
                className="review-form"
                onSubmit={e => this.reviewPostHandler(e)}
              >
                <textarea
                  maxLength="125"
                  value={this.state.moment}
                  onChange={e => this.setState({ moment: e.target.value })}
                />
                <select
                  className="rating-select"
                  value={this.state.rating}
                  onChange={e =>
                    this.setState({
                      rating: e.target.value
                    })
                  }
                  name="rating"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <input className="form-submit-btn" type="submit" />
              </form>
              {reviews}
            </div>
          </Modal>
        )}

        <Modal
          classNames={{
            overlay: 'custom-overlay',
            modal: 'custom-modal'
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
  auth: state.auth.userData
});

export default connect(mapStateToProps, actions)(Fixtures);
