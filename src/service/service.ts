import LoadingMiddleware from './middleware/LoadingMiddleware';
import store from '../store';
import ErrorMiddleware from './middleware/ErrorMiddleware';
import CacheMiddleware from './middleware/CacheMiddleware';
import REST, { URL } from './rest';
import config from '../config';
import client from './client';
import { Task } from '../modules/tasks/types/Task';

export enum ErrorType {
    Unknown,
    BadInput,
    NotFound,
    PermissionDenied,
    Unauthenticated,
    Internal,
    Unavailable,
    Timeout,
    Offline,
}

export interface Service {
    getTasks(userId: string): Promise<Task[]>;
    addTask(task: Task, shouldCache: boolean): Promise<boolean>;
    addTasks(tasks: Task[]): Promise<boolean>;
    deleteTask(taskId: string): Promise<boolean>;
    updateTask(task: Task): Promise<boolean>;
    setTaskFinished(task: Task): Promise<boolean>;
    getGuestTasks(): Promise<Task[]>;
    login(email: string, pass: string): Promise<boolean>;
    register(email: string, pass: string): Promise<boolean>;
}

export class ServiceError extends Error {
    public type: ErrorType;
    public endpoint: string;

    constructor(ep: string, type: ErrorType, message?: string) {
        super(`${ep} request failed: ${message || 'no message'}`);
        this.endpoint = ep;
        this.type = type;
    }
    public toString(): string {
        return `ServiceError(endpoint=${this.endpoint}, type=${this.type}, message=${this.message})`;
    }

    public toJSON(): string {
        return this.toString();
    }
}

const url = new URL(config.BACKEND_SCHEME, config.BACKEND, config.PREFIX);

const rest: Service = new REST(client, url);

const cache: Service = new CacheMiddleware(rest, store.dispatch);
const error: Service = new ErrorMiddleware(cache, store.dispatch);
const service: Service = new LoadingMiddleware(error, store.dispatch);

export default service;
