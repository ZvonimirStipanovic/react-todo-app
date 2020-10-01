import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { firebaseConfig } from '../firebase';
import { Task } from '../types/Task';
import { HTTPClient } from './client';
import { ErrorType, Service, ServiceError } from './service';

export class URL {
    private url: string;

    constructor(scheme: string, backend: string, prefix: string) {
        this.url = scheme + '://' + backend + prefix;
    }

    public path(): string {
        return this.url;
    }
}

class REST implements Service {
    public url: URL;
    private client: HTTPClient;

    constructor(httpClient: HTTPClient, url: URL) {
        this.client = httpClient;
        this.url = url;
    }

    public async getTasks(userId: string): Promise<any> {
        //REPLACE WITH AXIOS
        //const res = await this.request(this.getTasks, {
        //    method: 'POST',
        //    url: this.url.path() + 'users/' + userId + '/tasks',
        //});
        //console.log('res', res);
        //return GarbageTypesReply.fromJSON(res.data.result.garbageTypes);
        const database = firebaseConfig.firestore();
        return database
            .collection('users')
            .doc(userId)
            .collection('tasks')
            .get();
    }

    public async addTask(task: Task): Promise<boolean> {
        //REPLACE WITH AXIOS
        const database = firebaseConfig.firestore();
        try {
            database
                .collection('users')
                .doc(task.userId)
                .collection('tasks')
                .doc(task.taskId)
                .set({ ...task });
            return true;
        } catch (e) {
            return false;
        }
    }

    public async login(email: string, pass: string): Promise<boolean> {
        //REPLACE WITH AXIOS
        try {
            await firebaseConfig.auth().signInWithEmailAndPassword(email, pass);
            return true;
        } catch (e) {
            return false;
        }
    }

    public async register(email: string, pass: string): Promise<boolean> {
        //REPLACE WITH AXIOS
        try {
            await firebaseConfig
                .auth()
                .createUserWithEmailAndPassword(email, pass);
            return true;
        } catch (e) {
            return false;
        }
    }

    private request(
        endpoint: Function,
        req: AxiosRequestConfig
    ): Promise<AxiosResponse> {
        return new Promise((resolve, reject) => {
            this.client
                .request(req)
                .then((resp) => resolve(resp))
                .catch((err: AxiosError) => {
                    console.log(err);
                    reject(newServiceError(endpoint.name, err));
                });
        });
    }
}

export default REST;

const newServiceError = (ep: string, err: AxiosError): ServiceError => {
    if (err.response) {
        const { data, status } = err.response;

        if (status === 401) {
            return new ServiceError(ep, ErrorType.Unauthenticated);
        }

        if (status === 403) {
            return new ServiceError(ep, ErrorType.PermissionDenied);
        }

        if (status === 404) {
            return new ServiceError(ep, ErrorType.NotFound);
        }

        if (status === 408 || err.code === 'ECONNABORTED') {
            return new ServiceError(ep, ErrorType.Timeout);
        }

        if (status >= 500) {
            return new ServiceError(ep, ErrorType.Internal, data.message);
        }

        return new ServiceError(ep, ErrorType.BadInput, data.message);
    } else if (err.request) {
        if (err.code === 'ECONNABORTED') {
            return new ServiceError(ep, ErrorType.Timeout);
        }

        return new ServiceError(ep, ErrorType.Unavailable);
    }

    return new ServiceError(ep, ErrorType.Unknown, err.message);
};
