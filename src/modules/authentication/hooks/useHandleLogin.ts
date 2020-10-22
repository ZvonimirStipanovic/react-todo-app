import { AuthThunkActions } from '../components';
import * as H from 'history';
import { Dispatch } from 'redux';

export const useHandleLogin = (
    dispatch: Dispatch,
    history?: H.History,
    setOpenLogin?: (val: boolean) => void,
    type?: string
) => (event: any) => {
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
};
