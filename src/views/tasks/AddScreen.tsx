import React, { useState } from 'react';
import { RouterProps } from 'react-router';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { LOGIN_TOKEN } from 'modules/authentication';
import { Task, TaskService } from 'modules/tasks';
import { categories } from 'models';
import { AppRoute } from 'const';
import { Header } from 'components';
import { useAuthHook } from 'modules/authentication/hooks';

export default function AddScreen({ history }: RouterProps) {
    const [category, setCategory] = useState<string>('Home');

    const onBackClick = () => history.goBack();
    const auth = useAuthHook(false);

    const handleCategoriesChange = React.useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setCategory(event.target.value);
        },
        []
    );

    const handleAddTodo = React.useCallback(
        async (event: any) => {
            event.preventDefault();
            const { title, description, time } = event.target.elements;
            const userId = await localStorage.getItem(LOGIN_TOKEN);
            const date = new Date().toISOString();
            const task = new Task(
                userId!,
                date,
                title.value,
                description.value,
                category,
                time.value,
                false
            );
            TaskService.addTask(task, auth.isAnonymous).then(() =>
                history.push(AppRoute.Home)
            );
        },
        [category, history, auth.isAnonymous]
    );

    return (
        <div>
            <Header
                title="Add new todo"
                showBackButton={true}
                onBackClick={onBackClick}
            />
            <form style={{ margin: 16 }} onSubmit={handleAddTodo}>
                <TextField
                    id="title"
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
                    label="Time"
                    type="time"
                    defaultValue="07:30"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ height: 40, marginTop: 16 }}
                >
                    SUBMIT
                </Button>
            </form>
        </div>
    );
}
