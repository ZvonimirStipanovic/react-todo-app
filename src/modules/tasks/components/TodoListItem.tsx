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
    onEditClick?: (taskId: string) => void;
    onCheckboxClick?: (taskId: string) => void;
}

const TodoListItem = ({
    title,
    category,
    taskId,
    description,
    onDeleteClick,
    onEditClick,
    onCheckboxClick,
}: Props) => {
    let cat;

    switch (category) {
        case 'Sport':
            cat = <SportsSoccerIcon />;
            break;
        case 'Home':
            cat = <HomeIcon />;
            break;
        case 'Work':
            cat = <WorkIcon />;
            break;
        case 'School':
            cat = <SchoolIcon />;
            break;
        default:
            cat = <DeviceUnknownIcon />;
            break;
    }

    return (
        <ListItem>
            {onCheckboxClick && (
                <Checkbox
                    color="primary"
                    onClick={() => onCheckboxClick!(taskId)}
                />
            )}

            <div
                style={{
                    margin: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {cat}
            </div>
            <ListItemText primary={title} secondary={description} />
            <ListItemSecondaryAction>
                {onEditClick && (
                    <IconButton
                        aria-label="Edit"
                        onClick={() => onEditClick!(taskId)}
                    >
                        <EditOutlinedIcon />
                    </IconButton>
                )}
                <IconButton
                    aria-label="Delete"
                    onClick={() => onDeleteClick(taskId)}
                >
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default TodoListItem;
