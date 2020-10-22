import React, { useEffect, useState } from 'react';
import { RouterProps } from 'react-router';
import Button from '@material-ui/core/Button';
import { List, Paper, IconButton, Grid, TextField } from '@material-ui/core';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { useDispatch, connect } from 'react-redux';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Task, TaskService, tasksStyles, TodoListItem } from 'modules/tasks';
import { logout } from 'modules/authentication';
import LoginModal from 'modules/authentication/components/LoginModal';
import { AppState } from 'modules/redux-store/';
import { getActiveTasks } from 'modules/tasks/redux';
import { AppRoute } from 'const';
import { Header } from 'components';
import { TasksActions } from 'modules/tasks/redux';
import { useLogin } from 'hooks';

interface Props extends RouterProps {
    tasks: Task[];
}

function HomeScreen({ tasks, history }: Props) {
    const dispatch = useDispatch();

    const classes = tasksStyles();

    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const isAnonymous = useLogin(true);

    useEffect(() => {
        setLoading(false);
    }, []);

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
        history.push(AppRoute.Login);
    }, [history]);

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

    const onAddClick = React.useCallback(() => history.push(AppRoute.Add), [
        history,
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
                    onClick={() => history.push(AppRoute.Finished)}
                    style={{ margin: 16 }}
                    aria-label="Done"
                >
                    <CheckCircleOutlineIcon color="primary" fontSize="large" />
                </IconButton>
            </Grid>
        ),
        [onAddClick, history]
    );

    const onDeleteItemClick = React.useCallback(
        (taskId: string) => {
            const newTasks = tasks.filter(
                (task: Task) => task.taskId !== taskId
            );
            dispatch(TasksActions.Set(newTasks));
            TaskService.deleteTask(taskId);
        },
        [dispatch, tasks]
    );

    const onEditClick = React.useCallback(
        (taskId: string) => {
            const task = tasks.filter((task: Task) => task.taskId === taskId);
            history.push(AppRoute.Update, { task });
        },
        [tasks, history]
    );

    const onSearchChange = React.useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setSearchValue(event.target.value);
        },
        []
    );

    const onCheckboxClick = React.useCallback(
        (taskId: string) => {
            const taskIndex = tasks.findIndex(
                (task: Task) => task.taskId === taskId
            );
            const updatedTasks = [...tasks];
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
            TaskService.setTaskFinished(updatedTasks[taskIndex]);
            dispatch(TasksActions.Set(updatedTasks));
        },
        [tasks, dispatch]
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
            return tasks.map((item: Task) => (
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
            const toRender = tasks.filter((item: Task) =>
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
    }, [searchValue, tasks, onDeleteItemClick, onEditClick, onCheckboxClick]);

    return (
        <div className={classes.root}>
            <Header
                title="Home screen"
                showBackButton={false}
                topRightButtons={topRightButtons}
                titleStyle={classes.title}
            />
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

            {loading ? null : tasks.length < 1 ? null : (
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
