import React, { useState } from 'react';
import { RouterProps } from 'react-router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { Button } from 'components';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { AuthService, login } from 'modules/authentication';
import { AppRoute } from 'const';
import { useDispatch } from 'react-redux';
import { useAuthHook } from 'modules/authentication/hooks';
import { ButtonSize, ButtonType } from 'models';

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

export default function LoginScreen({ history }: RouterProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const classes = useStyles();
    const dispatch = useDispatch();

    const { handleLogin } = useAuthHook();

    const handleAnonymousLogin = () => {
        AuthService.anonymousLogin();
        login('guest');
        history.push(AppRoute.Home);
    };

    const handleLoginWithFacebook = React.useCallback(() => {
        /**const provider = new firebase.auth.FacebookAuthProvider();
        provider.setCustomParameters({
            display: 'popup',
        });
        firebase.auth().signInWithPopup(provider); */
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form}>
                    <TextField
                        variant="outlined"
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setEmail(event.target.value)}
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
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => setPassword(event.target.value)}
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
                        variant={ButtonType.Primary}
                        size={ButtonSize.Large}
                        additionalClasses={
                            'btn--font-med btn--elipsoid btn--shadow-low'
                        }
                        handleButtonClick={handleLoginButton}
                    >
                        Sign In
                    </Button>
                    <Button
                        variant={ButtonType.Secondary}
                        size={ButtonSize.Large}
                        additionalClasses={
                            'btn--font-med btn--elipsoid btn--shadow-low'
                        }
                        handleButtonClick={handleLoginWithFacebook}
                    >
                        Sign in with Facebook
                    </Button>

                    <Button
                        variant={ButtonType.Neutral}
                        size={ButtonSize.Large}
                        additionalClasses={
                            'btn--font-med btn--elipsoid btn--shadow-low'
                        }
                        handleButtonClick={handleAnonymousLogin}
                    >
                        Sign in anonymously
                    </Button>
                    <Grid container>
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

    function handleLoginButton(event: any) {
        event.preventDefault();
        handleLogin({ dispatch, history })(email, password);
    }
}
