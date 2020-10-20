import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import service from 'const/service/service';
import { firebaseConfig } from 'modules/firebase/firebase';
import { login } from './const/login';
import { Task } from 'modules/tasks/models/Task';
import { setTasks } from 'modules/tasks/redux/action';

interface Props {
    title: string;
    buttonTitle: string;
    open: boolean;
    type: string;
    setOpenLogin: (val: boolean) => void;
}

export default function LoginModal(p: Props) {
    const dispatch = useDispatch();

    const handleRegister = React.useCallback(
        async (event) => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            service.register(email.value, password.value).then(() => {
                service.login(email.value, password.value).then(async () => {
                    const userId = await firebaseConfig.auth().currentUser?.uid;
                    login(userId ? userId : 'guest');
                    service
                        .getGuestTasks()
                        .then((res: Task[]) => service.addTasks(res))
                        .then(() =>
                            service
                                .getTasks(userId!)
                                .then((tasks: Task[]) =>
                                    dispatch(setTasks(tasks))
                                )
                        )
                        .then(() => p.setOpenLogin(false));
                });
            });
        },
        [p, dispatch]
    );

    const handleLogin = React.useCallback(
        async (event) => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            service.login(email.value, password.value).then(async () => {
                const userId = await firebaseConfig.auth().currentUser?.uid;
                login(userId ? userId : 'guest');
                service
                    .getGuestTasks()
                    .then((res: Task[]) => service.addTasks(res))
                    .then(() =>
                        service
                            .getTasks(userId!)
                            .then((tasks: Task[]) => dispatch(setTasks(tasks)))
                    )
                    .then(() => p.setOpenLogin(false));
            });
        },
        [p, dispatch]
    );

    return (
        <div>
            <Dialog
                open={p.open}
                onClose={() => p.setOpenLogin(false)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{p.title}</DialogTitle>
                <form
                    onSubmit={p.type === 'login' ? handleLogin : handleRegister}
                >
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => p.setOpenLogin(false)}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            {p.buttonTitle}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
