import React from 'react';
import Reviews from '../Reviews/Reviews';
import Modal from 'react-responsive-modal';


export default function ReviewsModal (props){
 
  
    return (
      props.selectedMatch && (
        <Modal
          classNames={{
            overlay: 'custom-overlay',
            modal: 'custom-modal'
          }}
          open={props.openReviewModal}
          onClose={props.onCloseReviewModal}
          little
        >
          <div>
            <h1 className="reviews-heading">Reviews</h1>
            <form
              className="review-form"
              onSubmit={e => props.reviewPostHandler(e)}
            >
              <textarea
                maxLength="125"
                value={props.review}
                onChange={(e) => props.setReviewValue(e)}
              />
              <select
                className="rating-select"
                value={props.rating}
                onChange={(e) => props.setRatingValue(e)
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
          {props.reviewsResponse.map((review, index) => (
              <Reviews 
              key={index} 
              review={review}
              auth={props.authResponse}
              reviewDeleteHandler={(key)=> props.reviewDeleteHandler(key)}/>
            ))}
          </div>
        </Modal>
      )
    );
}
