import { List, Paper } from '@material-ui/core';
import React from 'react';
import { RouterProps } from 'react-router';
import { connect, useDispatch } from 'react-redux';
import { Task, TodoListItem } from 'modules/tasks';
import { service } from 'service';
import { AppState } from 'modules/redux-store/models/AppState';
import { getCompletedTasks } from 'modules/tasks/redux/selectors';
import { Header } from 'components';
import { TasksActions } from 'modules/tasks/redux';

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
            dispatch(TasksActions.Set(newTasks));
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
            <Header
                title="Finished Todos"
                showBackButton={true}
                onBackClick={onBackClick}
            />
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
