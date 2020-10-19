import { createSelector } from 'reselect';
import { AppState } from '../../redux-store/AppState';
import { Task } from '../models/Task';

const getTodos = (state: AppState) => state.tasks.tasks;

export const getActiveTasks = createSelector([getTodos], (tasks) =>
    tasks.filter((task: Task) => !task.isFinished)
);

export const getCompletedTasks = createSelector([getTodos], (tasks) =>
    tasks.filter((task: Task) => task.isFinished)
);
