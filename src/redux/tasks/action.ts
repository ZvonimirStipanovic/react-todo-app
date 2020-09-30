export const SET_TASKS = 'SET_TASKS';
export const SET_FINISHED_TASKS = 'SET_FINISHED_TASKS';

export const setTasks = (tasks: string) => ({
    type: SET_TASKS,
    tasks,
});

export const setFinishedTasks = (tasks: string) => ({
    type: SET_FINISHED_TASKS,
    tasks,
});
