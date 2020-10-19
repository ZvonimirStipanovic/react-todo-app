import { AnyAction } from 'redux';
import { Task } from '../models/Task';
import { SET_TASKS } from './action';

export interface State {
    tasks: Task[];
}

const INITIAL_STATE: State = {
    tasks: [],
};

const tasksReducer = (
    state: State = INITIAL_STATE,
    action: AnyAction
): State => {
    switch (action.type) {
        case SET_TASKS:
            return { ...state, tasks: action.tasks };
        default:
            return state;
    }
};

export default tasksReducer;
