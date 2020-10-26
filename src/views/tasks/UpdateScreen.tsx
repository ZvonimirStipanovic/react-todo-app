import React, { useEffect, useState } from 'react';
import { RouterProps } from 'react-router';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Task, TaskService } from 'modules/tasks';
import { categories } from 'models';
import { AppRoute } from 'const';
import { Header } from 'components';

export default function UpdateScreen({ history }: RouterProps) {
    const [task, setTask] = useState<Task>();

    useEffect(() => {
        const state: any = history.location.state;
        if (state) setTask(state.task[0]);
    }, [history.location.state]);

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
            <Header
                title="Update Todo"
                to={AppRoute.Home}
                showBackButton={true}
                showRightButtons={false}
            />
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

    function saveTodo(event: any) {
        event.preventDefault();
        TaskService.updateTask(task!).then(() => history.push(AppRoute.Home));
    }
}
