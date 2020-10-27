import 'firebase/firestore';
import { getLoginToken, GUEST_TASKS } from 'modules/authentication';
import { Task } from 'modules/tasks';
import { Collections } from '../models';
import { FirebaseService } from './FirebaseService';

export class FireStoreService<T extends any> {
    private firebase = FirebaseService.Instance;
    private firestore = this.firebase.firestore();
    private collection: firebase.firestore.CollectionReference;

    constructor(collection: string) {
        this.collection = this.firestore.collection(collection);
    }

    /** Fetch all tasks from a collection users or from local storage if anonymous */
    async getTasksAsync(userId: string, isAnonymous?: boolean): Promise<T[]> {
        if (isAnonymous) {
            const tasks = localStorage.getItem(GUEST_TASKS);
            if (tasks) return JSON.parse(tasks);
            else return [];
        }
        let tasks: T[] = [];
        await this.collection
            .doc(userId)
            .collection(Collections.Tasks)
            .get()
            .then((doc) => {
                doc.forEach((item) => tasks.push(item.data() as T));
            });
        return tasks;
    }

    /** Set all tasks to firebase, and remove from local storage */
    async addTasks(tasks: Task[]): Promise<boolean> {
        const userId = getLoginToken()!;
        try {
            tasks.forEach((task: Task) => {
                const newTask = { ...task, userId };
                this.firestore
                    .collection(Collections.Users)
                    .doc(userId)
                    .collection(Collections.Tasks)
                    .doc(task.taskId)
                    .set(newTask);
            });
            localStorage.removeItem(GUEST_TASKS);
            return true;
        } catch (e) {
            return false;
        }
    }

    /** Add one task */
    async addTask(task: Task, shouldCache: boolean): Promise<boolean> {
        if (shouldCache) return true;
        try {
            this.collection
                .doc(task.userId)
                .collection(Collections.Tasks)
                .doc(task.taskId)
                .set({ ...task });
            return true;
        } catch (e) {
            return false;
        }
    }

    /* delete one specific task */
    async deleteTask(taskId: string): Promise<boolean> {
        const userId = getLoginToken()!;
        try {
            this.collection
                .doc(userId)
                .collection(Collections.Tasks)
                .doc(taskId)
                .delete();
            return true;
        } catch (e) {
            return false;
        }
    }

    /** move task to finished list */
    async setTaskFinished(task: Task): Promise<boolean> {
        const userId = getLoginToken()!;
        try {
            this.collection
                .doc(userId)
                .collection(Collections.Tasks)
                .doc(task.taskId)
                .update({ ...task });
            return true;
        } catch (e) {
            return false;
        }
    }

    async updateTask(task: Task): Promise<boolean> {
        const userId = getLoginToken()!;
        try {
            this.collection
                .doc(userId)
                .collection(Collections.Tasks)
                .doc(task.taskId)
                .update(task);
            console.log('SUCC');
            return true;
        } catch (e) {
            return false;
        }
    }
}
