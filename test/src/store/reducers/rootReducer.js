import { combineReducers } from 'redux';
import user from './userReducer';
import modal from './modalReduser';

const rootReducer = combineReducers({
  user,
  modal,
})

export default rootReducer
