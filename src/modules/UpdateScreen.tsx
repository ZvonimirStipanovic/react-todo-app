import React, { useEffect, useState } from 'react';
import { RouterProps } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { categories } from './AddScreen';
import service from '../service/service';

interface Props extends RouterProps {}

export default function UpdateScreen(p: Props) {
    const [task, setTask]: any = useState();

    useEffect(() => {
        const state: any = p.history.location.state;
        if (state) setTask(state.task[0]);
    }, [p.history.location.state]);

    const onBackClick = React.useCallback(() => p.history.goBack(), [
        p.history,
    ]);

    const saveTodo = React.useCallback(
        async (event) => {
            event.preventDefault();
            service.updateTask(task).then(() => p.history.push('/'));
        },
        [task, p.history]
    );

    const handleChangeTitle = React.useCallback(
        (event: any) => {
            const newTask = { ...task, title: event.target.value };
            setTask(newTask);
        },
        [task]
    );

    const handleChangeDescription = React.useCallback(
        (event: any) => {
            const newTask = { ...task, description: event.target.value };
            setTask(newTask);
        },
        [task]
    );

    const handleCategoriesChange = React.useCallback(
        (event: any) => {
            const newTask = { ...task, category: event.target.value };
            setTask(newTask);
        },
        [task]
    );

    const handleTimeChange = React.useCallback(
        (event: any) => {
            const newTask = { ...task, time: event.target.value };
            setTask(newTask);
        },
        [task]
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
                    <Typography variant="h6">Update Todo</Typography>
                </Toolbar>
            </AppBar>
            <form style={{ margin: 16 }} onSubmit={saveTodo}>
                <TextField
                    id="title"
                    label="Title"
                    placeholder="Enter a title of a todo"
                    fullWidth
                    value={task ? task!.title : 'unknown'}
                    onChange={handleChangeTitle}
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
                    onChange={handleChangeDescription}
                    value={task ? task!.description : 'unknown'}
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
                    value={task ? task!.category : 'unknown'}
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
                    value={task ? task!.time : '00:00'}
                    fullWidth
                    onChange={handleTimeChange}
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
                    Update
                </Button>
            </form>
        </div>
    );
}
