import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';



import * as actions from '../../actions';
import './PreviousReviews.css';


export class PreviousReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openReviewModal: false,
      openHighlightsModal: false,
      rating: 0,
      review: '',
      matchId: null
    };
  }
  componentDidMount() {
    this.props.fetchAllReviewData();
  }

  handleUpdateReview = e => {
    e.preventDefault();
    const updateItem = {
      moment: this.state.review,
      rating: this.state.rating
    };
    this.props.updateReviewItem(this.state.matchId, updateItem);
  };

  onOpenReviewModal = (matchId, review, rating) => {
    this.setState({ openReviewModal: true, review, rating, matchId });
  };

  handleReviewChange = e => {
    this.setState({
      review: e.target.value
    });
  };

  handleRatingChange = e => {
    this.setState({
      rating: e.target.value
    });
  };

  reviewDeleteHandler(e, delId) {
    e.stopPropagation();
    this.props.deleteReviewItem(delId);
  }

  onCloseReviewModal = () => {
    this.setState({ openReviewModal: false });
  };

  render() {
    return (
      <React.Fragment>
        <div className="reviews-container">
          <table className="review-tbl">
            <thead>
              <tr className="tbl-header-row">
                <th>Match</th>
                <th>Rating</th>
                <th>Review</th>
              </tr>
            </thead>

            <tbody>
                {this.props.reviews.map((review, index) => (
                  <tr
                    key={index}
                    onClick={() =>
                      this.onOpenReviewModal(
                        review._id,
                        review.moment,
                        review.rating
                      )
                    }
                      className="tbl-info-row"
                  >
                    <td className="match-title">
                      {' '}
                      <i
                        className="fa fa-trash-o fa-fw"
                        onClick={e => this.reviewDeleteHandler(e, review._id)}
                      />
                      {review.match}
                    </td>
                    <td className="match-rating">{review.rating}</td>
                    <td className="match-review">{review.moment}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Modal
          classNames={{
            overlay: 'custom-overlay',
            modal: 'custom-modal-reviews'
          }}
          open={this.state.openReviewModal}
          onClose={this.onCloseReviewModal}
          little
        >
          <div className="custom-ui">
            <form
              className="review-form"
              onSubmit={e => this.handleUpdateReview(e)}
            >
              <textarea
                maxLength="125"
                value={this.state.review}
                onChange={e => this.handleReviewChange(e)}
              />
              <select
                className="rating-select"
                value={this.state.rating}
                onChange={e => this.handleRatingChange(e)}
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
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  reviews: state.review.reviewData,
  auth: state.auth.userData
});

export default connect(mapStateToProps, actions)(PreviousReviews);
