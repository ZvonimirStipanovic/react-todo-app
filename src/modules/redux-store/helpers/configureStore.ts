import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { tasksReducer } from 'modules/tasks';
import { LoadingReducer } from 'modules/loading';

const combinedReducers = {
    tasks: tasksReducer,
    loading: LoadingReducer,
};

export const store = createStore(
    combineReducers(combinedReducers),
    composeWithDevTools()
);
