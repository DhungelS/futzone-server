/* eslint-disable no-restricted-globals */

import React, { Component } from 'react';

class Review extends Component {
  state = {
  };

  _handleReviewItemSelect = () => {
    this.props.onUpdateMode(this.props.review)
  };

  _reviewDeleteHandler = () => {
    if (confirm('Are you sure')) {
      this.props.reviewDeleteHandler(this.props.review._id);
    }
  };

  render() {
    console.log('====================================');
    console.log('propprprp', this.props);
    console.log('====================================');
    const { review, authId } = this.props;
    return (
      <li onClick={this._handleReviewItemSelect} className="review-item">
        Match: <h4>{review.match}</h4> Rating: <h3>{review.rating}</h3>
        Review: <p>{review.moment}</p>
        User:{' '}
        {authId === review._user._id ? (
          <p> You </p>
        ) : (
          <p> {review._user.name} </p>
        )}
        <div className="trash-icon-div" onClick={this._reviewDeleteHandler}>
          {authId === review._user._id ? (
            <i className="fa fa-trash-o fa-fw" />
          ) : null}
        </div>
      </li>
    );
  }
}

export default Review;
