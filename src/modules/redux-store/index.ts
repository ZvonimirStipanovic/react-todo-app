import { tasksReducer } from 'modules/tasks/redux';
import { combineReducers } from 'redux';
import LoadingReducer from './loading';

export default combineReducers({
    tasks: tasksReducer,
    loading: LoadingReducer,
});
