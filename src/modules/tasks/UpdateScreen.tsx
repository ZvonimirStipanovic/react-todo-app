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
import service from '../../const/service/service';
import { Task } from './models/Task';
import { categories } from '../../models/Categories';

interface Props extends RouterProps {}

export default function UpdateScreen(p: Props) {
    const [task, setTask] = useState<Task>();

    useEffect(() => {
        const state: any = p.history.location.state;
        if (state) setTask(state.task[0]);
    }, [p.history.location.state]);

    const onBackClick = () => p.history.goBack();

    const saveTodo = React.useCallback(
        async (event) => {
            event.preventDefault();
            service.updateTask(task!).then(() => p.history.push('/'));
        },
        [task, p.history]
    );

    const handleChangeTask = React.useCallback(
        (name: string) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setTask({
                ...task,
                [name]: event.target.value,
            } as Task);
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
                    onChange={handleChangeTask('title')}
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
                    onChange={handleChangeTask('description')}
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
                    onChange={handleChangeTask('category')}
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
                    onChange={handleChangeTask('time')}
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
