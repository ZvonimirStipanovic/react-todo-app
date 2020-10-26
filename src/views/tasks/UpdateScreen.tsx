import React, { useEffect, useState } from 'react';
import { RouterProps } from 'react-router';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Task, TaskService } from 'modules/tasks';
import { ButtonSize, ButtonType, categories } from 'models';
import { AppRoute } from 'const';
import { Button, Header } from 'components';

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
            <form style={{ margin: 16 }}>
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
            </form>
        </div>
    );

    function saveTodo(event: any) {
        event.preventDefault();
        TaskService.updateTask(task!).then(() => history.push(AppRoute.Home));
    }
}
