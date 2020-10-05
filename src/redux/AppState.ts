import { State as LoadingState } from './loading';
import { State as TasksState } from '../modules/tasks/redux';

export interface AppState {
    readonly loading: LoadingState;
    readonly tasks: TasksState;
}
