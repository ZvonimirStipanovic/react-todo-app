import React from 'react';
import { RouterProps } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { logout } from '../router/login';

interface Props extends RouterProps {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
    })
);
export default function HomeScreen(p: Props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Home screen
                    </Typography>
                    <Button
                        color="inherit"
                        onClick={() => {
                            logout();
                            p.history.push('/login');
                        }}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
