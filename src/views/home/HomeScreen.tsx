import React, { useEffect, useState } from 'react';
import { RouterProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Task, TaskService, TodoListItem } from 'modules/tasks';
import { AppState } from 'modules/redux-store/';
import { getActiveTasks } from 'modules/tasks/redux';
import { AppRoute } from 'const';
import { Button, Header, TextField } from 'components';
import { TasksActions } from 'modules/tasks/redux';
import { useAuthHook } from 'modules/authentication/hooks';
import { ReactComponent as Finished } from 'assets/ui-icons/finished.svg';
import { ReactComponent as Add } from 'assets/ui-icons/add.svg';
import { ButtonSize, ButtonType } from 'models';

function HomeScreen({ history }: RouterProps) {
    const dispatch = useDispatch();

    const tasks = useSelector((state: AppState) => getActiveTasks(state));

    const [searchValue, setSearchValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const { isAnonymous } = useAuthHook(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    const addButton = React.useMemo(
        () => (
            <div className="btn--wrapper-end">
                <Button
                    variant={ButtonType.Primary}
                    size={ButtonSize.Small}
                    handleButtonClick={() => history.push(AppRoute.Add)}
                    additionalClasses={'btn--circle btn--icon'}
                >
                    <Add />
                </Button>
                <Button
                    variant={ButtonType.Secondary}
                    handleButtonClick={(event: any) =>
                        history.push(AppRoute.Finished)
                    }
                    size={ButtonSize.Small}
                    additionalClasses={'btn--circle btn--icon'}
                >
                    <Finished />
                </Button>
            </div>
        ),
        [history]
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
                <p className="v--home-anonymous-text">YOU ARE NOT LOGGED IN</p>
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
                    <p className="listitem--box listitem--shadow listitem--round listitem--empty">
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
        <div>
            <Header
                title="HOME SCREEN"
                history={history}
                showBackButton={false}
                showRightButtons={true}
            />
            {notLoggedText()}
            <div className="v--home-wapper">
                <TextField
                    type="text"
                    name="search"
                    placeholder="Search for a todo"
                    additionalClasses="textfield--size-lrg textfield--elipsoid"
                    onChange={setSearchValue}
                />
            </div>

            {loading ? null : tasks.length < 1 ? null : renderItems()}
            {addButton}
        </div>
    );
}

export default HomeScreen;
