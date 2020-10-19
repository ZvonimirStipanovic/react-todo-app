import { combineReducers } from 'redux';
import LoadingReducer from './loading';
import tasksReducer from '../tasks/redux';

export default combineReducers({
    tasks: tasksReducer,
    loading: LoadingReducer,
});
