import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import infoReducer from './info/reducer';

const rootReducer = combineReducers({
  profile: authReducer,
  info: infoReducer
});

export default rootReducer;
