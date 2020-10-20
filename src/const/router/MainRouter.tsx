import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { LoginScreen, RegisterScreen } from 'views/authentication';
import { HomeScreen } from 'views/home';
import { AddScreen, FinishedTasksScreen, UpdateScreen } from 'views/tasks';
import PrivateRoute from './PrivateRoute';

function MainRouter() {
    return (
        <BrowserRouter>
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/login" component={LoginScreen} />
            <PrivateRoute exact path="/" component={HomeScreen} />
            <PrivateRoute exact path="/add" component={AddScreen} />
            <PrivateRoute exact path="/update" component={UpdateScreen} />
            <PrivateRoute
                exact
                path="/finishedTasks"
                component={FinishedTasksScreen}
            />
        </BrowserRouter>
    );
}

export default MainRouter;
