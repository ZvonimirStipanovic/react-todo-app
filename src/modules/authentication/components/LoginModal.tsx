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
import { login } from '../const';
import { Task } from 'modules/tasks';
import { TasksActions } from 'modules/tasks/redux';
import {
    FirebaseService,
    FireStoreService,
    Collections,
} from 'modules/firebase';

interface Props {
    title: string;
    buttonTitle: string;
    open: boolean;
    type: string;
    setOpenLogin: (val: boolean) => void;
}

const auth = new FireStoreService<Task>(Collections.Auth);

export default function LoginModal(p: Props) {
    const firebase = FirebaseService.Instance;
    const dispatch = useDispatch();

    //EXPORT TO CUSTOM HOOK
    const getTasks = async (userId: string, isAnonymous: boolean) => {
        auth.getTasksAsync(userId, isAnonymous).then((tasks: Task[]) => {
            dispatch(TasksActions.Set(tasks));
        });
    };

    const handleRegister = async (event: any) => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        auth.register(email.value, password.value).then(() => {
            auth.login(email.value, password.value).then(async () => {
                const userId = await firebase.auth().currentUser?.uid;
                login(userId ? userId : 'guest');
                auth.getTasksAsync(userId!, true)
                    .then((res: Task[]) => auth.addTasks(res))
                    .then(() => getTasks(userId!, false))
                    .then(() => p.setOpenLogin(false));
            });
        });
    };

    const handleLogin = async (event: any) => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        auth.login(email.value, password.value).then(async () => {
            const userId = await firebase.auth().currentUser?.uid;
            login(userId ? userId : 'guest');
            auth.getTasksAsync(userId!, true)
                .then((res: Task[]) => auth.addTasks(res))
                .then(() => getTasks(userId!, false))
                .then(() => p.setOpenLogin(false));
        });
    };

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
