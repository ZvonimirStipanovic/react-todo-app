import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isGuest } from './login';

const PrivateRoute = ({ component, ...rest }: any) => {
    console.log('IS GUEST ? ', isGuest());
    return (
        <Route
            {...rest}
            render={(props) =>
                isGuest() ? (
                    React.createElement(component, props)
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
