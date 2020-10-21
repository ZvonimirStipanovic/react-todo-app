import { AnyAction } from 'redux';
import { LoadingActionTypes } from '.';

export interface LoadingState {
    [index: string]: boolean;
}

const initState: LoadingState = {};

export const LoadingReducer = (
    state: LoadingState = initState,
    action: AnyAction
): LoadingState => {
    switch (action.type) {
        case LoadingActionTypes.Start:
            return { ...state, [action.payload.name]: true };

        case LoadingActionTypes.Stop:
            return { ...state, [action.payload.name]: false };

        default:
            return state;
    }
};
