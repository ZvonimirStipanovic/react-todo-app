import React, { useState } from 'react';
import { RouterProps } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { isGuest, LOGIN_TOKEN } from 'modules/authentication';
import { Task } from 'modules/tasks';
import { service } from 'service';
import { categories } from 'models';

interface Props extends RouterProps {}

export default function AddScreen(p: Props) {
    const [category, setCategory] = useState<string>('Home');

    const onBackClick = () => p.history.goBack();
    const isAnonymous = isGuest();
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
            service.addTask(task, isAnonymous).then(() => p.history.push('/'));
        },
        [category, p.history, isAnonymous]
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
                    <Typography variant="h6">Add new todo</Typography>
                </Toolbar>
            </AppBar>
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
                    {categories.map((option: any) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
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
