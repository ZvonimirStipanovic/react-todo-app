import { LOGIN_TOKEN } from 'modules/authentication';
import { TaskThunkActions } from 'modules/tasks/redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const useLogin = (shouldGetTasks?: boolean) => {
    const [isAnonymous, setIsAnonymous] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const isGuest = localStorage.getItem(LOGIN_TOKEN) === 'guest';
        setIsAnonymous(isGuest);
    }, []);

    useEffect(() => {
        if (shouldGetTasks) {
            if (!isAnonymous) dispatch(TaskThunkActions.getTasks(false));
            else dispatch(TaskThunkActions.getTasks(true));
        }
    }, [dispatch, isAnonymous, shouldGetTasks]);

    return isAnonymous;
};
