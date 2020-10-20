import React, { useEffect, useState } from 'react';
import { RouterProps } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
    logout,
    LOGIN_TOKEN,
    isGuest,
} from '../../modules/authentication/const/login';
import LoginModal from '../../modules/authentication/LoginModal';
import { List, Paper, IconButton, Grid, TextField } from '@material-ui/core';
import TodoListItem from '../../modules/tasks/TodoListItem';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { useDispatch, connect } from 'react-redux';
import service from '../../const/service/service';
import { Task } from '../../modules/tasks/models/Task';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { setTasks } from '../../modules/tasks/redux/action';
import { getActiveTasks } from '../../modules/tasks/redux/selectors';
import { AppState } from '../../modules/redux-store/AppState';
import { tasksStyles } from '../../modules/tasks/styles';

interface Props extends RouterProps {
    tasks: Task[];
}

function HomeScreen(p: Props) {
    const dispatch = useDispatch();

    const classes = tasksStyles();

    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const isAnonymous = isGuest();

    useEffect(() => {
        let userId = 'userId';
        userId = localStorage.getItem(LOGIN_TOKEN)!;
        if (!isAnonymous)
            service.getTasks(userId).then((res: Task[]) => {
                dispatch(setTasks(res));
                setLoading(false);
            });
        else {
            service.getGuestTasks().then((res: Task[]) => {
                dispatch(setTasks(res));
                setLoading(false);
            });
        }
    }, [dispatch, isAnonymous]);

    const handleLoginButton = React.useCallback(
        () => setShowLoginModal(true),
        []
    );

    const handleRegisterButton = React.useCallback(
        () => setShowRegisterModal(true),
        []
    );

    const loginModal = React.useMemo(
        () => (
            <LoginModal
                open={showLoginModal}
                buttonTitle="Log in"
                title="Log in"
                type="login"
                setOpenLogin={(val: boolean) => setShowLoginModal(val)}
            />
        ),
        [showLoginModal]
    );

    const registerModal = React.useMemo(
        () => (
            <LoginModal
                open={showRegisterModal}
                buttonTitle="Register"
                title="Register"
                type="register"
                setOpenLogin={(val: boolean) => setShowRegisterModal(val)}
            />
        ),
        [showRegisterModal]
    );

    const handleLogout = React.useCallback(() => {
        logout();
        p.history.push('/login');
    }, [p.history]);

    const topRightButtons = React.useMemo(
        () =>
            isAnonymous ? (
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
            ) : (
                <Button color="inherit" onClick={handleLogout}>
                    Log out
                </Button>
            ),
        [isAnonymous, handleLoginButton, handleRegisterButton, handleLogout]
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
                <IconButton
                    onClick={() => p.history.push('/finishedTasks')}
                    style={{ margin: 16 }}
                    aria-label="Done"
                >
                    <CheckCircleOutlineIcon color="primary" fontSize="large" />
                </IconButton>
            </Grid>
        ),
        [onAddClick, p.history]
    );

    const onDeleteItemClick = React.useCallback(
        (taskId: string) => {
            const newTasks = p.tasks.filter(
                (task: Task) => task.taskId !== taskId
            );
            dispatch(setTasks(newTasks));
            service.deleteTask(taskId);
        },
        [dispatch, p.tasks]
    );

    const onEditClick = React.useCallback(
        (taskId: string) => {
            const task = p.tasks.filter((task: Task) => task.taskId === taskId);
            p.history.push('/update', { task });
        },
        [p.tasks, p.history]
    );

    const onSearchChange = React.useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setSearchValue(event.target.value);
        },
        []
    );

    const onCheckboxClick = React.useCallback(
        (taskId: string) => {
            const taskIndex = p.tasks.findIndex(
                (task: Task) => task.taskId === taskId
            );
            const updatedTasks = [...p.tasks];
            const task = updatedTasks[taskIndex];
            updatedTasks[taskIndex] = new Task(
                task.userId,
                task.taskId,
                task.title,
                task.description,
                task.category,
                task.time,
                true
            );
            service.setTaskFinished(updatedTasks[taskIndex]);
            dispatch(setTasks(updatedTasks));
        },
        [p.tasks, dispatch]
    );

    const notLoggedText = React.useCallback(
        () =>
            isAnonymous ? (
                <p
                    style={{
                        margin: 16,
                        fontSize: 24,
                        color: 'red',
                        textAlign: 'center',
                    }}
                >
                    YOU ARE NOT LOGGED IN
                </p>
            ) : null,
        [isAnonymous]
    );

    const renderItems = React.useCallback(() => {
        if (searchValue.length < 1)
            return p.tasks.map((item: Task) => (
                <TodoListItem
                    key={item.taskId}
                    taskId={item.taskId}
                    title={item.title}
                    category={item.category}
                    description={item.description}
                    onDeleteClick={onDeleteItemClick}
                    onEditClick={onEditClick}
                    onCheckboxClick={onCheckboxClick}
                />
            ));
        else {
            const toRender = p.tasks.filter((item: Task) =>
                item.title.toLowerCase().includes(searchValue)
            );
            if (toRender.length === 0)
                return (
                    <p style={{ margin: 12, color: 'gray' }}>
                        There are no todo's
                    </p>
                );

            return toRender.map((item: Task) => (
                <TodoListItem
                    key={item.taskId + item.taskId}
                    taskId={item.taskId}
                    title={item.title}
                    category={item.category}
                    description={item.description}
                    onDeleteClick={onDeleteItemClick}
                    onEditClick={onEditClick}
                    onCheckboxClick={onCheckboxClick}
                />
            ));
        }
    }, [searchValue, p.tasks, onDeleteItemClick, onEditClick, onCheckboxClick]);

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
            {notLoggedText()}
            {loginModal}
            {registerModal}
            <div style={{ margin: 16 }}>
                <TextField
                    id="search"
                    label="Search"
                    placeholder="Search for a todo"
                    fullWidth
                    onChange={onSearchChange}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
            </div>

            {loading ? null : p.tasks.length < 1 ? null : (
                <Paper style={{ margin: 16 }}>
                    <List style={{ overflow: 'hidden' }}>{renderItems()}</List>
                </Paper>
            )}
            {addButton}
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
    tasks: getActiveTasks(state),
});

export default connect(mapStateToProps)(HomeScreen);
