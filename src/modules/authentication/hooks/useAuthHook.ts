import { LOGIN_TOKEN } from 'modules/authentication';
import { TaskThunkActions } from 'modules/tasks/redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthService } from '../services';
import * as H from 'history';
import { Dispatch } from 'redux';
import { AuthThunkActions } from '../components';

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

    const handleRegister = (history: H.History) => (event: any) => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        AuthService.register(email.value, password.value, history);
    };

    const handleLogin = ({
        dispatch,
        history,
        setOpenLogin,
        type,
    }: LoginProps) => (event: any) => {
        event.preventDefault();
        const { email, password } = event.target.elements;

        if (type === 'register')
            AuthThunkActions.registerAndLogin(
                email.value,
                password.value,
                setOpenLogin!
            )(dispatch);

        AuthThunkActions.login(
            email.value,
            password.value,
            setOpenLogin,
            history
        )(dispatch);

        setIsAnonymous(false);
    };

    return { isAnonymous, handleRegister, handleLogin };
};
