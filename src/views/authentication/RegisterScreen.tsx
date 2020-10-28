import React, { useState } from 'react';
import { RouterProps } from 'react-router';
import { Button, Header, TextField } from 'components';
import { useAuthHook } from 'modules/authentication/hooks';
import { AppRoute } from 'const';
import { ButtonSize, ButtonType } from 'models';

export default function RegisterScreen({ history }: RouterProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { handleRegister } = useAuthHook();

    return (
        <div>
            <Header
                title="Register"
                showBackButton={true}
                to={AppRoute.Home}
                showRightButtons={false}
            />
            <div className="v-register">
                <h1 className="title">Register</h1>
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
                    handleButtonClick={handleRegisterButton}
                >
                    Register
                </Button>
            </div>
        </div>
    );

    function handleRegisterButton(event: any) {
        event.preventDefault();
        handleRegister(history)(email, password);
    }
}
