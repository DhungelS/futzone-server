import {
  GET_HIGHLIGHTS_REQUEST,
  GET_HIGHLIGHTS_SUCCESS,
  GET_HIGHLIGHTS_ERROR
} from '../actions/actionTypes';

const initialState = {
  highlightVids: [],
  loading: false,
  err: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_HIGHLIGHTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_HIGHLIGHTS_SUCCESS:
      return {
        ...state,
        highlightVids: action.payload
      };
    case GET_HIGHLIGHTS_ERROR:
      return {
        ...state,
        err: action.payload
      };
    default:
      return state;
  }
}
