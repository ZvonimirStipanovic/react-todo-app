import { ActionUnion, createAction } from 'modules/redux-store';
import { Task } from '../models';
import { TasksActionTypes } from './types';

export const TasksActions = {
    Set: (tasks: Task[]) => createAction(TasksActionTypes.Set, { tasks }),
};

export type TasksActions = ActionUnion<typeof TasksActions>;
