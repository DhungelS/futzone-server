
import {
  FETCH_GOOGLE_USER_REQUEST,
  FETCH_GOOGLE_USER_SUCCESS,
  FETCH_GOOGLE_USER_ERROR
} from '../actions/actionTypes';

const initialState = {
  userData: null,
  err: null,
  loading: false
}


export default function(state = initialState, action) {

  switch (action.type) {
    case FETCH_GOOGLE_USER_REQUEST:
    return {
      ...state,
      loading: true
    }
    case FETCH_GOOGLE_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload || false
      }
    case FETCH_GOOGLE_USER_ERROR:
      return {
        ...state,
        err: action.payload
      }
    default:
      return state;
  }
}
