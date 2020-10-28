import React, { useState } from 'react';
import { RouterProps } from 'react-router';
import { LOGIN_TOKEN } from 'modules/authentication';
import { Task, TaskService } from 'modules/tasks';
import { ButtonSize, ButtonType, categories } from 'models';
import { AppRoute } from 'const';
import { Button, Header, TextField } from 'components';
import { useAuthHook } from 'modules/authentication/hooks';
// @ts-ignore
import TimePicker from 'react-time-picker';

export default function AddScreen({ history }: RouterProps) {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<string>('Home');
    const [time, setTime] = useState<string>('08:00');

    const { isAnonymous } = useAuthHook(false);

    const handleCategoriesChange = React.useCallback((event: any) => {
        setCategory(event.target.value);
    }, []);

    return (
        <div className="v--add">
            <Header
                title="Add new todo"
                showBackButton={true}
                to={AppRoute.Home}
                showRightButtons={false}
            />
            <div className="v--add-wrapper">
                <TextField
                    type="text"
                    placeholder="Enter a title of a todo"
                    autoComplete="off"
                    additionalClasses="textfield--size-lrg textfield--elipsoid"
                    onChange={setTitle}
                    name="title"
                />
                <TextField
                    type="text"
                    additionalClasses="textfield--size-lrg textfield--elipsoid"
                    placeholder="Enter a description of a todo"
                    autoComplete="off"
                    onChange={setDescription}
                    name="title"
                />
                <div className="selection-elipsoid selection-shadow s-top--med">
                    <select onChange={handleCategoriesChange}>
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
                    onChange={setTime}
                    value={time}
                    className="v--add-time s-top--med s-right--med s-bottom-med s-left--med"
                />
                <div className="btn--wrapper-center">
                    <Button
                        variant={ButtonType.Primary}
                        size={ButtonSize.Large}
                        additionalClasses={
                            'btn--font-med btn--elipsoid btn--shadow-low btn--size-med'
                        }
                        handleButtonClick={handleAddTodo}
                    >
                        Add
                    </Button>
                </div>
            </div>
        </div>
    );

    async function handleAddTodo(event: any) {
        event.preventDefault();
        const userId = await localStorage.getItem(LOGIN_TOKEN);
        const date = new Date().toISOString();
        const task = new Task(
            userId!,
            date,
            title,
            description,
            category,
            time,
            false
        );
        TaskService.addTask(task, isAnonymous).then(() =>
            history.push(AppRoute.Home)
        );
    }
}
