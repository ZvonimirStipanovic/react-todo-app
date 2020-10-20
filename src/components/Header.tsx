import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

interface HeaderProps {
    title: string;
    showBackButton: boolean;
    topRightButtons?: React.ReactElement;
    titleStyle?: string;
    onBackClick?: () => void;
}

export const Header = (p: HeaderProps) => {
    return (
        <AppBar position="static">
            <Toolbar>
                {p.showBackButton && (
                    <IconButton
                        aria-label="Back"
                        onClick={p.onBackClick}
                        style={{ marginRight: 8 }}
                    >
                        <ArrowBackOutlinedIcon style={{ color: 'white' }} />
                    </IconButton>
                )}
                <Typography
                    variant="h6"
                    className={p.titleStyle ? p.titleStyle : undefined}
                >
                    {p.title}
                </Typography>
                {p.topRightButtons && p.topRightButtons}
            </Toolbar>
        </AppBar>
    );
};
