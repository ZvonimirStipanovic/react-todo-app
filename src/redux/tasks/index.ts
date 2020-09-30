import { AnyAction } from 'redux';
import { SET_FINISHED_TASKS, SET_TASKS } from './action';

export interface State {
    finishedTasks: [];
    tasks: [];
}

const INITIAL_STATE: State = {
    finishedTasks: [],
    tasks: [],
};

const tasksReducer = (
    state: State = INITIAL_STATE,
    action: AnyAction
): State => {
    switch (action.type) {
        case SET_FINISHED_TASKS:
            return { ...state, finishedTasks: action.tasks };
        case SET_TASKS:
            return { ...state, tasks: action.tasks };
        default:
            return state;
    }
};

export default tasksReducer;
