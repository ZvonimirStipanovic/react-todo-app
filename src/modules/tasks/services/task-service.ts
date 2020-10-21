import { Collections, FireStoreService } from 'modules/firebase';
import { Task } from '../models';

const user = new FireStoreService<any>(Collections.Users);

export const TaskService = {
    deleteTask: (taskId: string) => {
        user.deleteTask(taskId);
    },
    setTaskFinished: (task: Task) => {
        user.setTaskFinished(task);
    },
    addTask: async (task: Task, shouldCache: boolean): Promise<void> => {
        await user.addTask(task, shouldCache);
    },
    updateTask: async (task: Task): Promise<void> => {
        await user.updateTask(task);
    },
};
