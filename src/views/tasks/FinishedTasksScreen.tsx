import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Task, TodoListItem } from 'modules/tasks';
import { TasksActions } from 'modules/tasks/redux/action';
import { getCompletedTasks } from 'modules/tasks/redux/selectors';
import { Header } from 'components';
import { AppState } from 'modules/redux-store';
import { TaskService } from 'modules/tasks';
import { AppRoute } from 'const';

function FinishedTasksScreen() {
    const dispatch = useDispatch();

    const tasks = useSelector((state: AppState) => getCompletedTasks(state));

    return (
        <div>
            <Header
                title="FINISHED TASKS"
                to={AppRoute.Home}
                showBackButton={true}
                showRightButtons={false}
            />
            {tasks.length < 1
                ? null
                : tasks.map((item: Task) => (
                      <TodoListItem
                          key={item.taskId + item.title}
                          taskId={item.taskId}
                          title={item.title}
                          category={item.category}
                          description={item.description}
                          onDeleteClick={onDeleteItemClick}
                      />
                  ))}
        </div>
    );

    function onDeleteItemClick(taskId: string) {
        const newTasks = tasks.filter((task: Task) => task.taskId !== taskId);
        dispatch(TasksActions.Set(newTasks));
        TaskService.deleteTask(taskId);
    }
}

export default FinishedTasksScreen;
