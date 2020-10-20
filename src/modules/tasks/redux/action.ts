import { Task } from '../models/Task';

export const SET_TASKS = 'SET_TASKS';

export const setTasks = (tasks: Task[]) => ({
    type: SET_TASKS,
    tasks,
});
