export const SET_TASKS = 'SET_TASKS';
export const SET_TASK = 'SET_TASK';
export const SET_FINISHED_TASK = 'SET_FINISHED_TASK';
export const SET_FINISHED_TASKS = 'SET_FINISHED_TASKS';

export const setTask = (task: Object) => ({
    type: SET_TASK,
    task,
});

export const setTasks = (tasks: Object[]) => ({
    type: SET_TASKS,
    tasks,
});

export const setFinishedTasks = (tasks: Object[]) => ({
    type: SET_FINISHED_TASKS,
    tasks,
});

export const setFinishedTask = (task: Object) => ({
    type: SET_FINISHED_TASK,
    task,
});
