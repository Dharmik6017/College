import {combineReducers} from 'redux';
import authReducer from './authReducer';

const appReducer = combineReducers({
  /* your app’s top-level reducers */
  auth: authReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
