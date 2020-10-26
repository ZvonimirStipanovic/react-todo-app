import { AppRoute } from 'const';
import { AuthService } from 'modules/authentication/services';
import { TaskThunkActions } from 'modules/tasks/redux';
import * as H from 'history';
import { Dispatch } from 'redux';

const registerAndLogin = (
    email: string,
    password: string,
    setOpenLogin: (val: boolean) => void
) => (dispatch: Dispatch) => {
    AuthService.register(email, password).then(() => {
        AuthService.login(email, password).then(() => {
            TaskThunkActions.getTasks(false)(dispatch);
            setOpenLogin(false);
        });
    });
};

const login = (
    email: string,
    password: string,
    setOpenLogin?: (val: boolean) => void,
    history?: H.History
) => (dispatch: Dispatch) => {
    AuthService.login(email, password).then(() => {
        TaskThunkActions.getTasks(false)(dispatch).then(() => {
            login(email, password);
            setOpenLogin && setOpenLogin(false);
            history && history.push(AppRoute.Home);
        });
    });
};

export const AuthThunkActions = {
    registerAndLogin,
    login,
};
