import { AppState } from 'modules/redux-store/AppState';
import { createSelector } from 'reselect';
import { Task } from '../models/Task';

const getTodos = (state: AppState) => state.tasks.tasks;

export const getActiveTasks = createSelector([getTodos], (tasks) =>
    tasks.filter((task: Task) => !task.isFinished)
);

export const getCompletedTasks = createSelector([getTodos], (tasks) =>
    tasks.filter((task: Task) => task.isFinished)
);
