import { isLoggedIn } from 'modules/authentication';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component, ...rest }: any) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn() ? (
                    React.createElement(component, props)
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
