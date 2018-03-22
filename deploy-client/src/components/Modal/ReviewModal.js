import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Review from '../Review/Review';

const MAX_RATING = 5;

const getReviewForEdit = (id, reviews) => {
  return reviews.find(el => el._id === id);
};

class ReviewModal extends Component {
  state = {
    reviewToEdit: null,
    isEditMode: false,
    rating: 0,
  };

  _onUpdateMode = review => {
    this.setState({
      reviewToEdit: review,
      isEditMode: true,
    });
  };

  _reviewPostHandler = e => {
    e.preventDefault();
    this.props.reviewPostHandler();
  };

  _reviewUpdate = e => {
    e.preventDefault();
    this.props.updateReview(this.state.reviewToEdit);
    this.setState({
      isEditMode: false,
      reviewToEdit: null,
    });
  };

  _handleChange = e => {
    this.setState({ moment: e.target.value });
  };

  _handleUpdateChange = e => {
    this.setState({
      reviewToEdit: {
        ...this.state.reviewToEdit,
        moment: e.target.value,
      },
    });
  };

  _onRatingUpdateChange = e => {
    this.setState({
      reviewToEdit: {
        ...this.state.reviewToEdit,
        rating: e.target.value,
      },
    });
  };

  _onRatingChange = e => {
    this.setState({
      rating: e.target.value,
    });
  };

  render() {
    return (
      <Fragment>
        <h1 className="reviews-heading">Reviews</h1>
        {console.log('one modal')}
        {this.state.isEditMode ? (
          <form className="review-form" onSubmit={this._reviewUpdate}>
            <textarea
              maxLength="125"
              value={this.state.reviewToEdit.moment}
              onChange={this._handleUpdateChange}
            />
            <select
              className="rating-select"
              value={this.state.reviewToEdit.rating}
              onChange={this._onRatingUpdateChange}
              name="rating"
            >
              {Array.from({ length: MAX_RATING }).map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <input className="form-submit-btn" type="submit" />
          </form>
        ) : (
          <form className="review-form" onSubmit={this._reviewPostHandler}>
            <textarea
              maxLength="125"
              value={this.state.moment}
              onChange={this._handleChange}
            />
            <select
              className="rating-select"
              value={this.state.rating}
              onChange={this._onRatingChange}
              name="rating"
            >
              {Array.from({ length: MAX_RATING }).map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <input className="form-submit-btn" type="submit" />
          </form>
        )}
        {this.props.reviews.map(review => (
          <Review
            authId={this.props.auth._id}
            key={review._id}
            review={review}
            onUpdateMode={this._onUpdateMode}
            reviewDeleteHandler={this.props.reviewDeleteHandler}
          />
        ))}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth.userData,
});

export default connect(mapStateToProps)(ReviewModal);
