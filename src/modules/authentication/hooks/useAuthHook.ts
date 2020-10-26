import { LOGIN_TOKEN } from 'modules/authentication';
import { TaskThunkActions } from 'modules/tasks/redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthService } from '../services';
import * as H from 'history';
import { Dispatch } from 'redux';
import { AuthThunkActions } from '../redux';

export interface LoginProps {
    dispatch: Dispatch;
    history?: H.History;
    setOpenLogin?: (val: boolean) => void;
    type?: string;
}

export const useAuthHook = (shouldGetTasks?: boolean) => {
    const [isAnonymous, setIsAnonymous] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const isGuest = localStorage.getItem(LOGIN_TOKEN) === 'guest';
        setIsAnonymous(isGuest);
    }, []);

    useEffect(() => {
        if (shouldGetTasks) dispatch(TaskThunkActions.getTasks(isAnonymous));
    }, [dispatch, isAnonymous, shouldGetTasks]);

    const handleRegister = (history: H.History) => (
        email: string,
        password: string
    ) => {
        AuthService.register(email, password, history);
    };

    const handleLogin = ({
        dispatch,
        history,
        setOpenLogin,
        type,
    }: LoginProps) => (email: string, password: string) => {
        if (type === 'register')
            AuthThunkActions.registerAndLogin(
                email,
                password,
                setOpenLogin!
            )(dispatch);

        setIsAnonymous(false);

        AuthThunkActions.login(
            email,
            password,
            setOpenLogin,
            history
        )(dispatch);
    };

    return { isAnonymous, handleRegister, handleLogin };
};
