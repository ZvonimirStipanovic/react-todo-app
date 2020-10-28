import React, { useState } from 'react';
import { RouterProps } from 'react-router';
import { Button } from 'components';
import { AuthService, login } from 'modules/authentication';
import { AppRoute } from 'const';
import { useDispatch } from 'react-redux';
import { useAuthHook } from 'modules/authentication/hooks';
import { ButtonSize, ButtonType } from 'models';
import { TextField } from 'components';

export default function LoginScreen({ history }: RouterProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        <div className="v-login">
            <h1 className="v-login-title"> Sign in</h1>
            <TextField
                type="text"
                name="email"
                placeholder="Email Address"
                additionalClasses="textfield--size-lrg textfield--elipsoid "
                onChange={setEmail}
            />
            <TextField
                type="password"
                name="password"
                placeholder="Password"
                additionalClasses="textfield--size-lrg textfield--elipsoid "
                onChange={setPassword}
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
            <a href="/register" className="v-login--link">
                Don't have an account? Sign Up
            </a>
        </div>
    );

    function handleLoginButton(event: any) {
        event.preventDefault();
        handleLogin({ dispatch, history })(email, password);
    }
}
