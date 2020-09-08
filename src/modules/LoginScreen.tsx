import React from 'react';
import { RouterProps } from 'react-router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { firebaseConfig } from '../firebase';
import firebase from 'firebase';

interface Props extends RouterProps {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%',
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(1, 0, 1),
        },
    })
);

export default function LoginScreen(p: Props) {
    const classes = useStyles();

    const handleLogin = React.useCallback(
        async (event) => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await firebaseConfig
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                p.history.push('/');
            } catch (error) {
                alert(error);
            }
        },
        [p.history]
    );

    const handleLoginWithFacebook = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        provider.setCustomParameters({
            display: 'popup',
        });
        firebaseConfig
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                console.log('SUCC');
            })
            .catch((error) => {
                console.log('ERR', error);
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={handleLogin}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Button
                        onClick={handleLoginWithFacebook}
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                    >
                        Sign in with Facebook
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/home" variant="body2">
                                Continue as a guest
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
