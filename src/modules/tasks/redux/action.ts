import { Task } from '../types/Task';

export const SET_TASKS = 'SET_TASKS';

export const setTasks = (tasks: Task[]) => ({
    type: SET_TASKS,
    tasks,
});
