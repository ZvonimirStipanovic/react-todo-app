import { Service } from 'service';
import { Task } from 'modules/tasks';
import { Dispatch } from 'redux';
import { LoadingActions } from 'modules/loading';

class LoadingMiddleware implements Service {
    public next: Service;
    public dispatch: Dispatch;

    constructor(next: Service, dispatch: Dispatch) {
        this.next = next;
        this.dispatch = dispatch;
    }

    public async getTasks(userId: string): Promise<Task[]> {
        this.dispatch(LoadingActions.Start('getTasks'));
        try {
            const result = await this.next.getTasks(userId);
            this.dispatch(LoadingActions.Stop('getTasks'));
            return result;
        } catch (e) {
            this.dispatch(LoadingActions.Stop('getTasks'));
            throw e;
        }
    }

    public async addTask(task: Task, shouldCache: boolean): Promise<boolean> {
        this.dispatch(LoadingActions.Start('addTask'));
        try {
            this.dispatch(LoadingActions.Stop('addTask'));
            return await this.next.addTask(task, shouldCache);
        } catch (e) {
            this.dispatch(LoadingActions.Stop('addTask'));
            throw e;
        }
    }

    public async addTasks(tasks: Task[]): Promise<boolean> {
        this.dispatch(LoadingActions.Start('addTasks'));
        try {
            this.dispatch(LoadingActions.Stop('addTasks'));
            return await this.next.addTasks(tasks);
        } catch (e) {
            this.dispatch(LoadingActions.Stop('addTasks'));
            throw e;
        }
    }

    public async login(email: string, pass: string): Promise<boolean> {
        this.dispatch(LoadingActions.Start('login'));
        try {
            this.dispatch(LoadingActions.Stop('login'));
            return await this.next.login(email, pass);
        } catch (e) {
            this.dispatch(LoadingActions.Stop('login'));
            throw e;
        }
    }

    public async register(email: string, pass: string): Promise<boolean> {
        this.dispatch(LoadingActions.Start('register'));
        try {
            this.dispatch(LoadingActions.Stop('register'));
            return await this.next.register(email, pass);
        } catch (e) {
            this.dispatch(LoadingActions.Stop('register'));
            throw e;
        }
    }

    public async deleteTask(taskId: string): Promise<boolean> {
        this.dispatch(LoadingActions.Start('deleteTask'));
        try {
            this.dispatch(LoadingActions.Stop('deleteTask'));
            return await this.next.deleteTask(taskId);
        } catch (e) {
            this.dispatch(LoadingActions.Stop('deleteTask'));
            throw e;
        }
    }

    public async updateTask(task: Task): Promise<boolean> {
        this.dispatch(LoadingActions.Start('updateTask'));
        try {
            this.dispatch(LoadingActions.Stop('updateTask'));
            return await this.next.updateTask(task);
        } catch (e) {
            this.dispatch(LoadingActions.Stop('updateTask'));
            throw e;
        }
    }

    public async setTaskFinished(task: Task): Promise<boolean> {
        this.dispatch(LoadingActions.Start('setTaskFinished'));
        try {
            this.dispatch(LoadingActions.Stop('setTaskFinished'));
            return await this.next.setTaskFinished(task);
        } catch (e) {
            this.dispatch(LoadingActions.Stop('setTaskFinished'));
            throw e;
        }
    }

    public async getGuestTasks(): Promise<Task[]> {
        this.dispatch(LoadingActions.Start('getGuestTasks'));
        try {
            this.dispatch(LoadingActions.Stop('getGuestTasks'));
            return await this.next.getGuestTasks();
        } catch (e) {
            this.dispatch(LoadingActions.Stop('getGuestTasks'));
            throw e;
        }
    }
}

export default LoadingMiddleware;
