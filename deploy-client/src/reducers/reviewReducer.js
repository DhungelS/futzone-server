const initialState = {
  reviewData: [],
  err: false
}

export default function(state = initialState, action) {

  switch (action.type) {
    case 'FETCH_REVIEW_DATA_SUCCESS':
      return {
        ...state,
        reviewData: action.payload
      }
    case 'FETCH_REVIEW_DATA_FAILURE':
      return {
        ...state,
        err: action.payload
      }
      case'CREATE_REVIEW_DATA_SUCCESS':
      return {
        ...state,
        reviewData: [...state.reviewData, action.payload]
      }
      case 'CREATE_REVIEW_DATA_FAILURE':
      return {
        ...state,
        err: action.payload
      }
      case 'DELETE_REVIEW_ITEM_SUCCESS':
      return {
        ...state,
        
      }
    default:
      return state;
  }
}
