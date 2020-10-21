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
import { AuthService } from '../services';
import { TaskThunkActions } from 'modules/tasks/redux';

interface Props {
    title: string;
    buttonTitle: string;
    open: boolean;
    type: string;
    setOpenLogin: (val: boolean) => void;
}

export default function LoginModal(p: Props) {
    const dispatch = useDispatch();

    const handleRegister = async (event: any) => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        AuthService.register(email.value, password.value).then(() => {
            AuthService.login(email.value, password.value).then(() => {
                TaskThunkActions.getTasks(false)(dispatch);
                p.setOpenLogin(false);
            });
        });
    };

    const handleLogin = async (event: any) => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        AuthService.login(email.value, password.value).then(() => {
            TaskThunkActions.getTasks(false)(dispatch);
            p.setOpenLogin(false);
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
