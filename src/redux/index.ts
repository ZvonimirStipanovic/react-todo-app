import { combineReducers } from 'redux';
import LoadingReducer from './loading';
import tasksReducer from './tasks';

export default combineReducers({
    tasks: tasksReducer,
    loading: LoadingReducer,
});
