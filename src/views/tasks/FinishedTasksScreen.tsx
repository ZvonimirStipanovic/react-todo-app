import { List, Paper } from '@material-ui/core';
import React from 'react';
import { RouterProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Task, TodoListItem } from 'modules/tasks';
import { TasksActions } from 'modules/tasks/redux/action';
import { getCompletedTasks } from 'modules/tasks/redux/selectors';
import { Header } from 'components';
import { AppState } from 'modules/redux-store';
import { TaskService } from 'modules/tasks';

function FinishedTasksScreen({ history }: RouterProps) {
    const dispatch = useDispatch();

    const onBackClick = () => history.goBack();

    const tasks = useSelector((state: AppState) => getCompletedTasks(state));

    return (
        <div>
            <Header
                title="Finished Todos"
                showBackButton={true}
                onBackClick={onBackClick}
            />
            {tasks.length < 1 ? null : (
                <Paper style={{ margin: 16 }}>
                    <List style={{ overflow: 'hidden' }}>
                        {tasks.map((item: Task) => (
                            <TodoListItem
                                key={item.taskId + item.title}
                                taskId={item.taskId}
                                title={item.title}
                                category={item.category}
                                description={item.description}
                                onDeleteClick={onDeleteItemClick}
                            />
                        ))}
                    </List>
                </Paper>
            )}
        </div>
    );

    function onDeleteItemClick(taskId: string) {
        const newTasks = tasks.filter((task: Task) => task.taskId !== taskId);
        dispatch(TasksActions.Set(newTasks));
        TaskService.deleteTask(taskId);
    }
}

export default FinishedTasksScreen;
