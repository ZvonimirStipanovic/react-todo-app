import { State as LoadingState } from './loading';
import { State as TasksState } from '../tasks/redux';

export interface AppState {
    readonly loading: LoadingState;
    readonly tasks: TasksState;
}
