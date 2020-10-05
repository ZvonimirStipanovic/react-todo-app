import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';

interface Props {
    title: string;
    buttonTitle: string;
    open: boolean;
    setOpenLogin: (val: boolean) => void;
    onSubmit: (event: React.FormEvent) => void;
}

export default function LoginModal(p: Props) {
    return (
        <div>
            <Dialog
                open={p.open}
                onClose={() => p.setOpenLogin(false)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{p.title}</DialogTitle>
                <form onSubmit={p.onSubmit}>
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
