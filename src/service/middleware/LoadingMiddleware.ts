import { Dispatch } from 'redux';
import { startLoading, stopLoading } from '../../redux/loading/actions';
import { Task } from '../../types/Task';
import { Service } from '../service';

class LoadingMiddleware implements Service {
    public next: Service;
    public dispatch: Dispatch;

    constructor(next: Service, dispatch: Dispatch) {
        this.next = next;
        this.dispatch = dispatch;
    }

    public async getTasks(userId: string): Promise<any> {
        this.dispatch(startLoading('getTasks'));
        try {
            const result = await this.next.getTasks(userId);
            this.dispatch(stopLoading('getTasks'));
            return result;
        } catch (e) {
            this.dispatch(stopLoading('getTasks'));
            throw e;
        }
    }

    public async addTask(task: Task): Promise<boolean> {
        this.dispatch(startLoading('addTask'));
        try {
            this.dispatch(stopLoading('addTask'));
            return await this.next.addTask(task);
        } catch (e) {
            this.dispatch(stopLoading('addTask'));
            throw e;
        }
    }

    public async login(email: string, pass: string): Promise<boolean> {
        this.dispatch(startLoading('login'));
        try {
            this.dispatch(stopLoading('login'));
            return await this.next.login(email, pass);
        } catch (e) {
            this.dispatch(stopLoading('login'));
            throw e;
        }
    }

    public async register(email: string, pass: string): Promise<boolean> {
        this.dispatch(startLoading('register'));
        try {
            this.dispatch(stopLoading('register'));
            return await this.next.register(email, pass);
        } catch (e) {
            this.dispatch(stopLoading('register'));
            throw e;
        }
    }

    public async deleteTask(taskId: string): Promise<boolean> {
        this.dispatch(startLoading('deleteTask'));
        try {
            this.dispatch(stopLoading('deleteTask'));
            return await this.next.deleteTask(taskId);
        } catch (e) {
            this.dispatch(stopLoading('deleteTask'));
            throw e;
        }
    }

    public async updateTask(task: Task): Promise<boolean> {
        this.dispatch(startLoading('updateTask'));
        try {
            this.dispatch(stopLoading('updateTask'));
            return await this.next.updateTask(task);
        } catch (e) {
            this.dispatch(stopLoading('updateTask'));
            throw e;
        }
    }
}

export default LoadingMiddleware;
