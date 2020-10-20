import { AnyAction } from 'redux';
import { Task } from '../models';
import { TasksActionTypes } from './types';

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
        case TasksActionTypes.Set:
            return { ...state, tasks: action.payload.tasks };
        default:
            return state;
    }
};
