import { combineReducers } from 'redux';
import tasksReducer from './tasks';
import userReducer from './user';

export default combineReducers({
    user: userReducer,
    tasks: tasksReducer,
});
