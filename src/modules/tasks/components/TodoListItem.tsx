import React from 'react';
import { Checkbox, IconButton } from '@material-ui/core';
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
        <div className="listitem--box listitem--shadow listitem--round s-top--sml s-right--med">
            {onCheckboxClick && (
                <Checkbox
                    color="primary"
                    onClick={() => onCheckboxClick!(taskId)}
                />
            )}
            <div className="listitem--category s-top--sml s-right--sml">
                {cat}
            </div>
            <div className="listitem--wrapper">
                <div className="text--wrapper">
                    <p className="listitem--title">{title}</p>
                    <p className="listitem--description">{description}</p>
                </div>
                <div className="button-wrapper">
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
                </div>
            </div>
        </div>
    );
};

export default TodoListItem;
