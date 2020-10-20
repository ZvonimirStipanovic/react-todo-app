import {
    AppBar,
    IconButton,
    List,
    Paper,
    Toolbar,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { RouterProps } from 'react-router';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import { connect, useDispatch } from 'react-redux';
import { Task } from 'modules/tasks/models';
import TodoListItem from 'modules/tasks/components/TodoListItem';
import { setTasks } from 'modules/tasks/redux/action';
import service from 'const/service/service';
import { AppState } from 'modules/redux-store/AppState';
import { getCompletedTasks } from 'modules/tasks/redux/selectors';

interface Props extends RouterProps {
    tasks: Task[];
}

function FinishedTasksScreen(p: Props) {
    const dispatch = useDispatch();

    const onBackClick = () => p.history.goBack();

    const onDeleteItemClick = React.useCallback(
        (taskId: string) => {
            const newTasks = p.tasks.filter(
                (task: Task) => task.taskId !== taskId
            );
            dispatch(setTasks(newTasks));
            service.deleteTask(taskId);
        },
        [p.tasks, dispatch]
    );

    const toRender = React.useCallback(
        () =>
            p.tasks.map((item: Task) => (
                <TodoListItem
                    key={item.taskId + item.title}
                    taskId={item.taskId}
                    title={item.title}
                    category={item.category}
                    description={item.description}
                    onDeleteClick={onDeleteItemClick}
                />
            )),
        [p.tasks, onDeleteItemClick]
    );

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        aria-label="Back"
                        onClick={onBackClick}
                        style={{ marginRight: 8 }}
                    >
                        <ArrowBackOutlinedIcon style={{ color: 'white' }} />
                    </IconButton>
                    <Typography variant="h6">Finished Todos</Typography>
                </Toolbar>
            </AppBar>
            {p.tasks.length < 1 ? null : (
                <Paper style={{ margin: 16 }}>
                    <List style={{ overflow: 'hidden' }}>{toRender()}</List>
                </Paper>
            )}
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
    tasks: getCompletedTasks(state),
});

export default connect(mapStateToProps)(FinishedTasksScreen);
