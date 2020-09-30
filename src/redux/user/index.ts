import { AnyAction } from 'redux';
import { SET_USER_ID } from './actions';

export interface State {
    userId: string | null;
}

const INITIAL_STATE: State = {
    userId: null,
};

const userReducer = (
    state: State = INITIAL_STATE,
    action: AnyAction
): State => {
    switch (action.type) {
        case SET_USER_ID:
            return { ...state, userId: action.userId };
        default:
            return state;
    }
};

export default userReducer;
