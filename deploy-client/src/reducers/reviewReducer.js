const initialState = {
  reviewData: [],
  err: false
}

export default function(state = initialState, action) {
  console.log(action)
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
        reviewData: state.reviewData.filter(review => review._id !== action.payload)
      }
      case 'DELETE_REVIEW_ITEM_FAILURE':
      return {
        ...state,
       err: action.payload
      }
      case 'UPDATE_REVIEW_ITEM_SUCCESS': 
      return {
        ...state,
        reviewData: state.reviewData.map(ele => {
          if(action.payload.id === ele._id){
            return {
              ...action.payload
            }
          }
          else{
            return ele
          }
        })
      }
      case 'UPDATE_REVIEW_ITEM_FAILURE': 
      return {
        ...state,
        err: action.payload
      }
    default:
      return state;
  }
}
