import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import './PreviousReviews.css';

export class PreviousReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchAllReviewData();
  }

  render() {
    return (
      <div className="reviews-container">
        <h1>Your Previous Reviews</h1>
        {this.props.reviews.map((review, index) => 
        <div key={index} className="review-item">
        <h5 className="match-title">{review.match}</h5>
      <p className="match-rating">{review.rating}</p>
      <p className="match-review">{review.moment}</p>
      </div>
      )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reviews: state.review.reviewData,
  auth: state.auth.userData
});

export default connect(mapStateToProps, actions)(PreviousReviews);
