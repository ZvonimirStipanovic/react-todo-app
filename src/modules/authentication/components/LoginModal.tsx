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
import { AuthThunkActions } from './redux';

interface Props {
    title: string;
    buttonTitle: string;
    open: boolean;
    type: string;
    setOpenLogin: (val: boolean) => void;
}

export default function LoginModal({
    title,
    buttonTitle,
    open,
    type,
    setOpenLogin,
}: Props) {
    const dispatch = useDispatch();

    const handleRegister = async (event: any) => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        dispatch(
            AuthThunkActions.registerAndLogin(
                email.value,
                password.value,
                setOpenLogin
            )
        );
    };

    const handleLogin = async (event: any) => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        dispatch(
            AuthThunkActions.login(email.value, password.value, setOpenLogin)
        );
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={() => setOpenLogin(false)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <form
                    onSubmit={type === 'login' ? handleLogin : handleRegister}
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
                            onClick={() => setOpenLogin(false)}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            {buttonTitle}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
