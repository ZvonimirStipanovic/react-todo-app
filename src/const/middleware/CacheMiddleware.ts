import { Dispatch } from 'redux';
import { GUEST_TASKS } from '../../modules/authentication/const/login';
import { Task } from '../../modules/tasks/models/Task';
import { Service } from '../service/service';

class CacheMiddleware implements Service {
    public next: Service;
    public dispatch: Dispatch;

    constructor(next: Service, dispatch: Dispatch) {
        this.next = next;
        this.dispatch = dispatch;
    }

    public async getTasks(userId: string): Promise<Task[]> {
        try {
            const tasks = await this.next.getTasks(userId);
            return tasks;
        } catch (e) {
            throw e;
        }
    }

    public async addTask(task: Task, shouldCache: boolean): Promise<boolean> {
        try {
            if (shouldCache) {
                const tasks = localStorage.getItem(GUEST_TASKS);
                if (tasks) {
                    const parsed = JSON.parse(tasks);
                    const newTasks = [...parsed, task];
                    localStorage.setItem(GUEST_TASKS, JSON.stringify(newTasks));
                } else
                    localStorage.setItem(GUEST_TASKS, JSON.stringify([task]));
            }
            return await this.next.addTask(task, shouldCache);
        } catch (e) {
            throw e;
        }
    }

    public async addTasks(tasks: Task[]): Promise<boolean> {
        try {
            return await this.next.addTasks(tasks);
        } catch (e) {
            throw e;
        }
    }

    public async login(email: string, pass: string): Promise<boolean> {
        try {
            return await this.next.login(email, pass);
        } catch (e) {
            throw e;
        }
    }

    public async register(email: string, pass: string): Promise<boolean> {
        try {
            return await this.next.register(email, pass);
        } catch (e) {
            throw e;
        }
    }

    public async deleteTask(taskId: string): Promise<boolean> {
        try {
            return await this.next.deleteTask(taskId);
        } catch (e) {
            throw e;
        }
    }

    public async updateTask(task: Task): Promise<boolean> {
        try {
            return await this.next.updateTask(task);
        } catch (e) {
            throw e;
        }
    }

    public async setTaskFinished(task: Task): Promise<boolean> {
        try {
            return await this.next.setTaskFinished(task);
        } catch (e) {
            throw e;
        }
    }

    public async getGuestTasks(): Promise<Task[]> {
        try {
            return await this.next.getGuestTasks();
        } catch (e) {
            throw e;
        }
    }
}

export default CacheMiddleware;
