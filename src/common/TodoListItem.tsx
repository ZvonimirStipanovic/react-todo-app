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

interface Props {
    text: string;
    description?: string;
    onDeleteClick?: () => void;
    onEditClick?: () => void;
}

const TodoListItem = (p: Props) => (
    <ListItem>
        <Checkbox
            color="primary"
            //onClick={props.onCheckBoxToggle}
            //checked={props.checked}
        />
        <ListItemText primary={p.text} secondary={p.description} />
        <ListItemSecondaryAction>
            <IconButton aria-label="Edit" onClick={p.onEditClick}>
                <EditOutlinedIcon />
            </IconButton>
            <IconButton aria-label="Delete" onClick={p.onDeleteClick}>
                <DeleteOutlineOutlinedIcon />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
);

export default TodoListItem;
