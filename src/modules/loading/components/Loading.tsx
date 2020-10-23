import { CircularProgress, createStyles, makeStyles } from '@material-ui/core';
import { AppState } from 'modules/redux-store';
import React from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        uiProgress: {
            position: 'fixed',
            zIndex: 1000,
            height: '31px',
            width: '31px',
            left: '45%',
            top: '35%',
        },
    })
);

interface Props {
    readonly children: JSX.Element;
}

function Loading({ children }: Props) {
    const classes = useStyles();

    const loading = useSelector((state: AppState) => state.loading);

    let showLoading = false;
    if (loading) {
        for (const load in loading) {
            if (loading.hasOwnProperty(load)) {
                if (loading[load] === true) {
                    showLoading = true;
                }
            }
        }
    }

    let loadingContent = null;
    if (showLoading) {
        loadingContent = (
            <CircularProgress size={150} className={classes.uiProgress} />
        );
    }

    return (
        <div className={classes.root}>
            {children}
            {loadingContent}
        </div>
    );
}

export default Loading;
