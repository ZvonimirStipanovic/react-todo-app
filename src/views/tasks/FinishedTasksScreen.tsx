import { List, Paper } from '@material-ui/core';
import React from 'react';
import { RouterProps } from 'react-router';
import { connect, useDispatch } from 'react-redux';
import { Task, TodoListItem } from 'modules/tasks';
import { TasksActions } from 'modules/tasks/redux/action';
import { getCompletedTasks } from 'modules/tasks/redux/selectors';
import { Header } from 'components';
import { AppState } from 'modules/redux-store';
import { TaskService } from 'modules/tasks';

interface Props extends RouterProps {
    tasks: Task[];
}

function FinishedTasksScreen({ tasks, history }: Props) {
    const dispatch = useDispatch();

    const onBackClick = () => history.goBack();

    const onDeleteItemClick = React.useCallback(
        (taskId: string) => {
            const newTasks = tasks.filter(
                (task: Task) => task.taskId !== taskId
            );
            dispatch(TasksActions.Set(newTasks));
            TaskService.deleteTask(taskId);
        },
        [tasks, dispatch]
    );

    const toRender = React.useCallback(
        () =>
            tasks.map((item: Task) => (
                <TodoListItem
                    key={item.taskId + item.title}
                    taskId={item.taskId}
                    title={item.title}
                    category={item.category}
                    description={item.description}
                    onDeleteClick={onDeleteItemClick}
                />
            )),
        [tasks, onDeleteItemClick]
    );

    return (
        <div>
            <Header
                title="Finished Todos"
                showBackButton={true}
                onBackClick={onBackClick}
            />
            {tasks.length < 1 ? null : (
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
