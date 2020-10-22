import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { tasksReducer } from 'modules/tasks';
import { LoadingReducer } from 'modules/loading';

const combinedReducers = {
    tasks: tasksReducer,
    loading: LoadingReducer,
};

const composeEnhancers = composeWithDevTools({});

export const store = createStore(
    combineReducers(combinedReducers),
    {},
    composeEnhancers(applyMiddleware(thunk))
);
