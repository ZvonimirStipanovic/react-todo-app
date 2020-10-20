import { LoadingState } from 'modules/loading';
import { TaskState } from 'modules/tasks';

export interface AppState {
    readonly loading: LoadingState;
    readonly tasks: TaskState;
}
