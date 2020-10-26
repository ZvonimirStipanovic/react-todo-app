import React, { useState } from 'react';
import { RouterProps } from 'react-router';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { LOGIN_TOKEN } from 'modules/authentication';
import { Task, TaskService } from 'modules/tasks';
import { ButtonSize, ButtonType, categories } from 'models';
import { AppRoute } from 'const';
import { Button, Header } from 'components';
import { useAuthHook } from 'modules/authentication/hooks';

export default function AddScreen({ history }: RouterProps) {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<string>('Home');
    const [time, setTime] = useState<string>('');

    const { isAnonymous } = useAuthHook(false);

    const handleCategoriesChange = React.useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setCategory(event.target.value);
        },
        []
    );

    return (
        <div>
            <Header
                title="Add new todo"
                showBackButton={true}
                to={AppRoute.Home}
                showRightButtons={false}
            />
            <form style={{ margin: 16 }}>
                <TextField
                    id="title"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setTitle(event.target.value)
                    }
                    label="Title"
                    placeholder="Enter a title of a todo"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    id="description"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setDescription(event.target.value)
                    }
                    label="Description"
                    placeholder="Enter a description of a todo"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    id="category"
                    select
                    fullWidth
                    margin="normal"
                    label="Category"
                    value={category}
                    onChange={handleCategoriesChange}
                    variant="outlined"
                >
                    <MenuItem key={categories.home} value={categories.home}>
                        {categories.home}
                    </MenuItem>
                    <MenuItem key={categories.school} value={categories.school}>
                        {categories.school}
                    </MenuItem>
                    <MenuItem key={categories.sport} value={categories.sport}>
                        {categories.sport}
                    </MenuItem>
                    <MenuItem key={categories.work} value={categories.work}>
                        {categories.work}
                    </MenuItem>
                </TextField>
                <TextField
                    id="time"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setTime(event.target.value)
                    }
                    label="Time"
                    type="time"
                    defaultValue="07:30"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
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
            </form>
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
