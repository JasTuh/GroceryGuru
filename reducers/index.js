import { combineReducers } from 'redux';
import listReducer from './groceryListReducer';

const rootReducer = combineReducers({
  grocery_list: listReducer
});

export default rootReducer;
