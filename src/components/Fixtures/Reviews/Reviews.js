import React from 'react'

export default function Review(props) {
  console.log(props);
  return (
    <li
      className="review-item"
      key={props.review._id}
    >
      Match: <h4>{props.review.match}</h4> Rating: <h3>{props.review.rating}</h3>
      Review: <p>{props.review.moment}</p>
      User:
      {props.auth.user._id === props.review._user.id ||props.auth.user.id === props.review._user.id  ? (
        <p> You </p>
      ) : (
        <p> {props.auth.user.local.username} </p>
      )}
      <div
        className="trash-icon-div"
        onClick={() => props.reviewDeleteHandler(props.review._id)}
      >
        {props.auth.user._id === props.review._user.id ||props.auth.user.id === props.review._user.id  ? (
          <i className="fa fa-trash-o fa-fw" />
        ) : null}
      </div>
    </li>
  );
}
