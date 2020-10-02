import React from 'react';
import {
    ListItem,
    Checkbox,
    IconButton,
    ListItemText,
    ListItemSecondaryAction,
} from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import DeviceUnknownIcon from '@material-ui/icons/DeviceUnknown';

interface Props {
    title: string;
    category: string;
    taskId: string;
    description?: string;
    onDeleteClick: (taskId: string) => void;
    onEditClick: (taskId: string) => void;
}

const TodoListItem = (p: Props) => {
    let category;

    switch (p.category) {
        case 'Sport':
            category = <SportsSoccerIcon />;
            break;
        case 'Home':
            category = <HomeIcon />;
            break;
        case 'Work':
            category = <WorkIcon />;
            break;
        case 'School':
            category = <SchoolIcon />;
            break;
        default:
            category = <DeviceUnknownIcon />;
            break;
    }

    return (
        <ListItem>
            <Checkbox
                color="primary"
                //onClick={props.onCheckBoxToggle}
                //checked={props.checked}
            />
            <div
                style={{
                    margin: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {category}
            </div>
            <ListItemText primary={p.title} secondary={p.description} />
            <ListItemSecondaryAction>
                <IconButton
                    aria-label="Edit"
                    onClick={() => p.onEditClick(p.taskId)}
                >
                    <EditOutlinedIcon />
                </IconButton>
                <IconButton
                    aria-label="Delete"
                    onClick={() => p.onDeleteClick(p.taskId)}
                >
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default TodoListItem;
