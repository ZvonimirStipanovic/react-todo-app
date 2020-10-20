import { AnyAction } from 'redux';
import { Task } from '../models';
import { SET_TASKS } from './action';

export interface TaskState {
    tasks: Task[];
}

const INITIAL_STATE: TaskState = {
    tasks: [],
};

export const tasksReducer = (
    state: TaskState = INITIAL_STATE,
    action: AnyAction
): TaskState => {
    switch (action.type) {
        case SET_TASKS:
            return { ...state, tasks: action.tasks };
        default:
            return state;
    }
};
