import {
    AppBar,
    IconButton,
    List,
    Paper,
    Toolbar,
    Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { RouterProps } from 'react-router';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import TodoListItem from '../common/TodoListItem';
import service from '../service/service';
import { useDispatch, useStore } from 'react-redux';
import { setFinishedTasks } from '../redux/tasks/action';

interface Props extends RouterProps {}

export default function FinishedTasksScreen(p: Props) {
    const [tasks, setTasks]: any = useState([{}]);

    const store = useStore();
    const dispatch = useDispatch();

    useEffect(() => {
        setTasks(store.getState().tasks.finishedTasks);
    }, [store]);

    const onBackClick = React.useCallback(() => p.history.goBack(), [
        p.history,
    ]);

    const onDeleteItemClick = React.useCallback(
        (taskId: string) => {
            const newTasks = tasks.filter(
                (task: any) => task.taskId !== taskId
            );
            setTasks(newTasks);
            dispatch(setFinishedTasks(newTasks));
            service.deleteTask(taskId);
        },
        //eslint-disable-next-line
        [store.getState().tasks.finishedTasks, dispatch, store, tasks]
    );

    const toRender = React.useCallback(
        () =>
            tasks.map((item: any) => (
                <TodoListItem
                    key={item.taskId + item.title}
                    taskId={item.taskId}
                    title={item.title}
                    category={item.category}
                    description={item.description}
                    onDeleteClick={onDeleteItemClick}
                />
            )),
        //eslint-disable-next-line
        [store.getState().finishedTasks, tasks]
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
            {tasks.length < 1 ? null : (
                <Paper style={{ margin: 16 }}>
                    <List style={{ overflow: 'hidden' }}>{toRender()}</List>
                </Paper>
            )}
        </div>
    );
}
