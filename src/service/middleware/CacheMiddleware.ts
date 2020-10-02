import { Dispatch } from 'redux';
import { Task } from '../../types/Task';
import { Service } from '../service';

class CacheMiddleware implements Service {
    public next: Service;
    public dispatch: Dispatch;

    constructor(next: Service, dispatch: Dispatch) {
        this.next = next;
        this.dispatch = dispatch;
    }

    public async getTasks(userId: string): Promise<any> {
        try {
            const tasks = await this.next.getTasks(userId);
            return tasks;
        } catch (e) {
            throw e;
        }
    }

    public async addTask(task: Task): Promise<boolean> {
        try {
            return await this.next.addTask(task);
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
}

export default CacheMiddleware;
