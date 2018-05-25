import {FETCH_REVIEW_DATA_REQUEST, FETCH_REVIEW_DATA_SUCCESS, FETCH_REVIEW_DATA_ERROR, FETCH_ALL_REVIEW_DATA_REQUEST, FETCH_ALL_REVIEW_DATA_SUCCESS, FETCH_ALL_REVIEW_DATA_ERROR, CREATE_REVIEW_DATA_REQUEST, CREATE_REVIEW_DATA_SUCCESS, CREATE_REVIEW_DATA_ERROR, UPDATE_REVIEW_ITEM_REQUEST, UPDATE_REVIEW_ITEM_SUCCESS, UPDATE_REVIEW_ITEM_ERROR, DELETE_REVIEW_ITEM_REQUEST, DELETE_REVIEW_ITEM_SUCCESS, DELETE_REVIEW_ITEM_ERROR} from '../actions/actionTypes'

const initialState = {
  reviewData: [],
  err: null,
  loading: false
}

export default function(state = initialState, action) {
  
  switch (action.type) {
    case FETCH_REVIEW_DATA_REQUEST:
    return {
      ...state,
      loading: true
    }
    case FETCH_REVIEW_DATA_SUCCESS:
      return {
        ...state,
        reviewData: action.payload
      }
    case FETCH_REVIEW_DATA_ERROR:
      return {
        ...state,
        err: action.payload
      }
      case FETCH_ALL_REVIEW_DATA_REQUEST:
      return {
        ...state,
        loading: true
      }
      case FETCH_ALL_REVIEW_DATA_SUCCESS:
      return {
        ...state,
        reviewData: action.payload
      }
      case FETCH_ALL_REVIEW_DATA_ERROR:
      return{
        ...state,
        err: action.payload
      }
      case CREATE_REVIEW_DATA_REQUEST:
      return {
        ...state,
        loading: true
      }
      case CREATE_REVIEW_DATA_SUCCESS:
      return {
        ...state,
        reviewData: [...state.reviewData, action.payload]
      }
      case CREATE_REVIEW_DATA_ERROR:
      return {
        ...state,
        err: action.payload
      }
      case DELETE_REVIEW_ITEM_REQUEST:
      return {
        ...state,
       loading: true
      }
      case DELETE_REVIEW_ITEM_SUCCESS:
      return {
        ...state,
        reviewData: state.reviewData.filter(review => review._id !== action.payload)
      }
      case DELETE_REVIEW_ITEM_ERROR:
      return {
        ...state,
       err: action.payload
      }
      case UPDATE_REVIEW_ITEM_REQUEST:
      return {
        ...state,
       loading: true
      }
      case UPDATE_REVIEW_ITEM_SUCCESS: 
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
      case UPDATE_REVIEW_ITEM_ERROR: 
      return {
        ...state,
        err: action.payload
      }
    default:
      return state;
  }
}
