import { Collections, FireStoreService } from 'modules/firebase';
import { Dispatch } from 'redux';
import { Task } from '../models';
import { TasksActions } from './action';
import { getLoginToken } from 'modules/authentication';

const getTasks = (isAnonymous: boolean) => async (dispatch: Dispatch) => {
    const auth = new FireStoreService<Task>(Collections.Users);
    const userId = await getLoginToken();
    if (userId) {
        auth.getTasksAsync(userId, isAnonymous)
            .then((tasks: Task[]) => auth.addTasks(tasks))
            .then(() => {
                auth.getTasksAsync(userId, isAnonymous).then((tasks: Task[]) =>
                    dispatch(TasksActions.Set(tasks))
                );
            });
    }
    return;
};

export const TaskThunkActions = {
    getTasks,
};
