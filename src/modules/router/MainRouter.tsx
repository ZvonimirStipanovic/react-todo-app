import { AppRoute } from 'const';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {
    AddScreen,
    FinishedTasksScreen,
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    UpdateScreen,
} from 'views';
import PrivateRoute from './PrivateRoute';

export function MainRouter() {
    return (
        <BrowserRouter>
            <Route exact path={AppRoute.Register} component={RegisterScreen} />
            <Route exact path={AppRoute.Login} component={LoginScreen} />
            <PrivateRoute exact path={AppRoute.Home} component={HomeScreen} />
            <PrivateRoute exact path={AppRoute.Add} component={AddScreen} />
            <PrivateRoute
                exact
                path={AppRoute.Update}
                component={UpdateScreen}
            />
            <PrivateRoute
                exact
                path={AppRoute.Finished}
                component={FinishedTasksScreen}
            />
        </BrowserRouter>
    );
}
