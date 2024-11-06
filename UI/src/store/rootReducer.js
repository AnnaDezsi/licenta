import { combineReducers } from 'redux';
import authReducer from './auth/reducer';

const rootReducer = combineReducers({
  profile: authReducer,
});

export default rootReducer;
