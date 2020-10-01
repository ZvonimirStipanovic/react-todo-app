import { Dispatch } from 'redux';
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
        //this.dispatch(startLoading('getTasks'));
        try {
            const result = await this.next.getTasks(userId);
            //this.dispatch(stopLoading('getTasks'));
            return result;
        } catch (e) {
            //this.dispatch(stopLoading('getTasks'));
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
}

export default LoadingMiddleware;
