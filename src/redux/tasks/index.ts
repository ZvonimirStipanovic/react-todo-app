import { AnyAction } from 'redux';
import {
    SET_FINISHED_TASK,
    SET_FINISHED_TASKS,
    SET_TASK,
    SET_TASKS,
} from './action';

export interface State {
    finishedTasks: Object[];
    tasks: Object[];
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
        case SET_FINISHED_TASK:
            return {
                ...state,
                finishedTasks: [...state.finishedTasks, action.task],
            };
        case SET_TASKS:
            return { ...state, tasks: action.tasks };
        case SET_TASK:
            return { ...state, tasks: [...state.tasks, action.task] };
        default:
            return state;
    }
};

export default tasksReducer;
