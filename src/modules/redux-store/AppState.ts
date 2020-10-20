import { TaskState } from 'modules/tasks/redux';
import { LoadingState } from './loading';

export interface AppState {
    readonly loading: LoadingState;
    readonly tasks: TaskState;
}
