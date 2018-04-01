
import {
  SIGNUP_LOCAL_USER_REQUEST,
  SIGNUP_LOCAL_USER_SUCCESS,
  SIGNUP_LOCAL_USER_ERROR,
  LOGIN_LOCAL_USER_REQUEST,
  LOGIN_LOCAL_USER_SUCCESS,
  LOGIN_LOCAL_USER_ERROR,
  FETCH_GOOGLE_USER_REQUEST,
  FETCH_GOOGLE_USER_SUCCESS,
  FETCH_GOOGLE_USER_ERROR
} from '../actions/actionTypes';

const initialState = {
  userData: null,
  err: null,
  localUserData: null,
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
      case SIGNUP_LOCAL_USER_REQUEST:
    return {
      ...state,
     loading: true
    }
    case SIGNUP_LOCAL_USER_SUCCESS:
    return {
      ...state,
     localUserData: action.payload
    }
    case  SIGNUP_LOCAL_USER_ERROR:
    return {
      ...state,
      err: action.payload
    }
    case  LOGIN_LOCAL_USER_REQUEST:
    return {
      ...state,
      loading: true
    }
    case LOGIN_LOCAL_USER_SUCCESS:
    return {
      ...state,
      localUserData: action.payload
    }
    case LOGIN_LOCAL_USER_ERROR:
    return {
      ...state,
      err: action.payload
    }
    default:
      return state;
  }
}
