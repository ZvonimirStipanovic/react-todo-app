import React, { useState } from 'react';
import { RouterProps } from 'react-router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Button, Header } from 'components';
import { useAuthHook } from 'modules/authentication/hooks';
import { AppRoute } from 'const';
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
            margin: theme.spacing(3, 0, 2),
        },
    })
);

export default function RegisterScreen({ history }: RouterProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const classes = useStyles();

    const { handleRegister } = useAuthHook();

    return (
        <div>
            <Header
                title="Register"
                showBackButton={true}
                to={AppRoute.Home}
                showRightButtons={false}
            />
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Register
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
                        />
                        <Button
                            variant={ButtonType.Primary}
                            size={ButtonSize.Large}
                            additionalClasses={
                                'btn--font-med btn--elipsoid btn--shadow-low'
                            }
                            handleButtonClick={handleRegisterButton}
                        >
                            Register
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
    );

    function handleRegisterButton(event: any) {
        event.preventDefault();
        handleRegister(history)(email, password);
    }
}
