import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import { BackButton } from './BackButton';

interface HeaderProps {
    title: string;
    showBackButton: boolean;
    topRightButtons?: React.ReactElement;
    titleStyle?: string;
    onBackClick?: () => void;
}

export const Header = ({
    title,
    showBackButton,
    topRightButtons,
    titleStyle,
    onBackClick,
}: HeaderProps) => {
    return (
        <AppBar position="static">
            <Toolbar>
                {showBackButton && (
                    <IconButton
                        aria-label="Back"
                        onClick={onBackClick}
                        style={{ marginRight: 8 }}
                    >
                        <ArrowBackOutlinedIcon style={{ color: 'white' }} />
                    </IconButton>
                )}
                <Typography
                    variant="h6"
                    className={titleStyle ? titleStyle : undefined}
                >
                    {title}
                </Typography>
                {topRightButtons && topRightButtons}
            </Toolbar>
        </AppBar>
    );
};

interface HeaderPropsHtml {
    title: string;
    to: string;
    showBackButton: boolean;
    showRightButtons: boolean;
}

export const HeaderHtml = ({
    title,
    to,
    showBackButton,
    showRightButtons,
}: HeaderPropsHtml) => {
    return (
        <header className="header">
            <div className="wrapper">
                {showBackButton && <BackButton to={to} />}
                <h6>{title}</h6>
                {showRightButtons && <div></div>}
            </div>
        </header>
    );
};
