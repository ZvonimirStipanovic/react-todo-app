import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { useAuthHook } from '../hooks';
import * as H from 'history';

interface Props {
    title: string;
    buttonTitle: string;
    open: boolean;
    type: string;
    setOpenLogin: (val: boolean) => void;
    history?: H.History;
}

export default function LoginModal({
    title,
    buttonTitle,
    open,
    type,
    setOpenLogin,
    history,
}: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const { handleLogin } = useAuthHook(false);

    return (
        <div>
            <Dialog
                open={open}
                onClose={() => setOpenLogin(false)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <div>
                    <DialogContent>
                        <TextField
                            autoFocus
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setEmail(event.target.value)}
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setPassword(event.target.value)}
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
                        <Button
                            type="submit"
                            color="primary"
                            onClick={() =>
                                handleLogin({
                                    dispatch,
                                    type,
                                    setOpenLogin,
                                    history,
                                })(email, password)
                            }
                        >
                            {buttonTitle}
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}
