import React, { useEffect, useState } from 'react';
import { RouterProps } from 'react-router';
import { Task, TaskService } from 'modules/tasks';
import { ButtonSize, ButtonType, categories } from 'models';
import { AppRoute } from 'const';
import { Button, Header, TextField } from 'components';
// @ts-ignore
import TimePicker from 'react-time-picker';

export default function UpdateScreen({ history }: RouterProps) {
    const [task, setTask] = useState<Task>();

    useEffect(() => {
        const state: any = history.location.state;
        if (state) setTask(state.task[0]);
    }, [history.location.state]);

    const handleChangeTask = React.useCallback(
        (name: string) => (value: string) => {
            setTask({
                ...task,
                [name]: value,
            } as Task);
        },
        [task]
    );

    const handleCategoriesChange = React.useCallback(
        (event: any) => {
            setTask({
                ...task,
                category: event.target.value,
            } as Task);
        },
        [task]
    );

    return (
        <div className="v--update">
            <Header
                title="Update Todo"
                to={AppRoute.Home}
                showBackButton={true}
                showRightButtons={false}
            />
            <div className="v--update-wrapper s-top--lrg s-right--lrg s-bottom-lrg s-left--lrg">
                <TextField
                    type="text"
                    value={task?.title}
                    placeholder="Enter a title of a todo"
                    autoComplete="off"
                    additionalClasses="textfield--size-lrg textfield--elipsoid"
                    onChange={handleChangeTask('title')}
                    name="title"
                />
                <TextField
                    type="text"
                    value={task?.description}
                    additionalClasses="textfield--size-lrg textfield--elipsoid"
                    placeholder="Enter a description of a todo"
                    autoComplete="off"
                    onChange={handleChangeTask('description')}
                    name="title"
                />
                <div className="selection-elipsoid selection-shadow s-top--med">
                    <select
                        onChange={handleCategoriesChange}
                        value={task?.category}
                    >
                        <option value={categories.home}>
                            {categories.home}
                        </option>
                        <option value={categories.school}>
                            {categories.school}
                        </option>
                        <option value={categories.sport}>
                            {categories.sport}
                        </option>
                        <option value={categories.work}>
                            {categories.work}
                        </option>
                    </select>
                </div>

                <TimePicker
                    onChange={handleChangeTask('time')}
                    value={task?.time}
                    className="v--add-time s-top--med s-right--med s-bottom-med s-left--med"
                />
                <div className="btn--wrapper-center">
                    <Button
                        variant={ButtonType.Primary}
                        size={ButtonSize.Large}
                        additionalClasses={
                            'btn--font-med btn--elipsoid btn--shadow-low btn--size-med'
                        }
                        handleButtonClick={saveTodo}
                    >
                        Update
                    </Button>
                </div>
            </div>
        </div>
    );

    function saveTodo(event: any) {
        event.preventDefault();
        TaskService.updateTask(task!).then(() => history.push(AppRoute.Home));
    }
}
