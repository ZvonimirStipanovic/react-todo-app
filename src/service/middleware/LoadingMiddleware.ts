import { Service } from 'service';
import { startLoading, stopLoading } from 'modules/loading/redux/actions';
import { Task } from 'modules/tasks';
import { Dispatch } from 'redux';

class LoadingMiddleware implements Service {
    public next: Service;
    public dispatch: Dispatch;

    constructor(next: Service, dispatch: Dispatch) {
        this.next = next;
        this.dispatch = dispatch;
    }

    public async getTasks(userId: string): Promise<Task[]> {
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

    public async addTask(task: Task, shouldCache: boolean): Promise<boolean> {
        this.dispatch(startLoading('addTask'));
        try {
            this.dispatch(stopLoading('addTask'));
            return await this.next.addTask(task, shouldCache);
        } catch (e) {
            this.dispatch(stopLoading('addTask'));
            throw e;
        }
    }

    public async addTasks(tasks: Task[]): Promise<boolean> {
        this.dispatch(startLoading('addTasks'));
        try {
            this.dispatch(stopLoading('addTasks'));
            return await this.next.addTasks(tasks);
        } catch (e) {
            this.dispatch(stopLoading('addTasks'));
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

    public async setTaskFinished(task: Task): Promise<boolean> {
        this.dispatch(startLoading('setTaskFinished'));
        try {
            this.dispatch(stopLoading('setTaskFinished'));
            return await this.next.setTaskFinished(task);
        } catch (e) {
            this.dispatch(stopLoading('setTaskFinished'));
            throw e;
        }
    }

    public async getGuestTasks(): Promise<Task[]> {
        this.dispatch(startLoading('getGuestTasks'));
        try {
            this.dispatch(stopLoading('getGuestTasks'));
            return await this.next.getGuestTasks();
        } catch (e) {
            this.dispatch(stopLoading('getGuestTasks'));
            throw e;
        }
    }
}

export default LoadingMiddleware;
