import { tasksReducer } from 'modules/tasks/redux';
import { combineReducers } from 'redux';
import LoadingReducer from '../loading/redux';

export default combineReducers({
    tasks: tasksReducer,
    loading: LoadingReducer,
});
