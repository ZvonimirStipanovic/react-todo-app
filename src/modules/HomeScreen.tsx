import React, { useEffect, useState } from 'react';
import { RouterProps } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { logout, login, isLoggedIn, LOGIN_TOKEN } from '../router/login';
import LoginModal from '../common/LoginModal';
import { List, Paper, IconButton, Grid } from '@material-ui/core';
import TodoListItem from '../common/TodoListItem';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { useStore, useDispatch } from 'react-redux';
import { setFinishedTasks } from '../redux/tasks/action';
import service from '../service/service';

interface Props extends RouterProps {}

const useStyles = makeStyles(() =>
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
    const store = useStore();
    const dispatch = useDispatch();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [tasks, setTasks] = useState([{}]);

    useEffect(() => {
        let userId = 'userId';
        userId = localStorage.getItem(LOGIN_TOKEN)!;
        service.getTasks(userId).then((res) => {
            let finishedTasks: Object[] = [];
            let tasks: Object[] = [];
            res.forEach((document: any) => {
                const data = document.data();
                if (data.isFinished) finishedTasks.push(data);
                else tasks.push(data);
            });
            dispatch(setFinishedTasks(finishedTasks));
            setTasks(tasks);
        });
    }, [store, dispatch]);

    const classes = useStyles();

    const handleLoginButton = React.useCallback(
        () => setShowLoginModal(true),
        []
    );
    const handleRegisterButton = React.useCallback(
        () => setShowRegisterModal(true),
        []
    );

    const handleLogin = React.useCallback(async (event) => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        service
            .login(email.value, password.value)
            .then(() => setShowLoginModal(false));
    }, []);

    const handleRegister = React.useCallback(async (event) => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        service.register(email.value, password.value).then(() => {
            service.login(email.value, password.value);
            login(email.value + password.value);
            setShowRegisterModal(false);
        });
    }, []);

    const loginModal = React.useMemo(
        () => (
            <LoginModal
                open={showLoginModal}
                buttonTitle="Log in"
                title="Log in"
                onSubmit={handleLogin}
                setOpenLogin={(val: boolean) => setShowLoginModal(val)}
            />
        ),
        [showLoginModal, handleLogin]
    );

    const registerModal = React.useMemo(
        () => (
            <LoginModal
                open={showRegisterModal}
                buttonTitle="Register"
                title="Register"
                onSubmit={handleRegister}
                setOpenLogin={(val: boolean) => setShowRegisterModal(val)}
            />
        ),
        [showRegisterModal, handleRegister]
    );

    const handleLogout = React.useCallback(() => {
        logout();
        p.history.push('/login');
    }, [p.history]);

    const topRightButtons = React.useMemo(
        () =>
            isLoggedIn() ? (
                <Button color="inherit" onClick={handleLogout}>
                    Log out
                </Button>
            ) : (
                <>
                    <Button
                        color="inherit"
                        onClick={handleLoginButton}
                        style={{ marginRight: 8 }}
                    >
                        Log in
                    </Button>
                    <Button color="inherit" onClick={handleRegisterButton}>
                        Register
                    </Button>
                </>
            ),
        [isLoggedIn(), handleLoginButton, handleRegisterButton, handleLogout]
    );

    const onAddClick = React.useCallback(() => p.history.push('/add'), [
        p.history,
    ]);

    const addButton = React.useMemo(
        () => (
            <Grid container justify="flex-end" alignItems="flex-end">
                <IconButton
                    aria-label="Add"
                    onClick={onAddClick}
                    style={{ margin: 16 }}
                >
                    <AddCircleOutlinedIcon color="primary" fontSize="large" />
                </IconButton>
            </Grid>
        ),
        [onAddClick]
    );

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Home screen
                    </Typography>
                    {topRightButtons}
                </Toolbar>
            </AppBar>
            {loginModal}
            {registerModal}
            <Paper style={{ margin: 16 }}>
                <List style={{ overflow: 'hidden' }}>
                    {tasks.map((item: any) => (
                        <TodoListItem
                            text={item.title}
                            description={item.description}
                        ></TodoListItem>
                    ))}
                </List>
            </Paper>
            {addButton}
        </div>
    );
}
