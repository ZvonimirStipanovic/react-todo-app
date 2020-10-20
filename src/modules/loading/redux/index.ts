import { AnyAction } from 'redux';
import { START_LOADING, STOP_LOADING } from './actions';

export interface LoadingState {
    [index: string]: boolean;
}

const initState: LoadingState = {};

const LoadingReducer = (
    state: LoadingState = initState,
    action: AnyAction
): LoadingState => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, [action.name]: true };

        case STOP_LOADING:
            return { ...state, [action.name]: false };

        default:
            return state;
    }
};

export default LoadingReducer;
