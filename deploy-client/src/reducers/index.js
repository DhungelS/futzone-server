import {combineReducers} from 'redux';
import authReducer from './authReducer';
import reviewReducer from './reviewReducer';
import soccerApiReducer from './soccerApiReducer';
import highlightsReducer from './highlightsReducer';

export default combineReducers({
  auth: authReducer,
  review: reviewReducer,
  soccerData: soccerApiReducer,
  highlights: highlightsReducer
});