import { TaskState } from 'modules/tasks';
import { LoadingState } from '../loading/redux';

export interface AppState {
    readonly loading: LoadingState;
    readonly tasks: TaskState;
}
