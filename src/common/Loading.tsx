import { CircularProgress, createStyles, makeStyles } from '@material-ui/core';
import React from 'react';
import { State as LoadingState } from '../redux/loading/index';
import { connect } from 'react-redux';
import { AppState } from '../redux/AppState';

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
    readonly loading: LoadingState;
    readonly children: JSX.Element;
}

function Loading({ children, loading }: Props) {
    const classes = useStyles();

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

const mapStateToProps = (state: AppState) => ({
    loading: state.loading,
});

export default connect(mapStateToProps)(Loading);
