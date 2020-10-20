import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginScreen from 'views/authentication/LoginScreen';
import RegisterScreen from 'views/authentication/RegisterScreen';
import HomeScreen from 'views/home/HomeScreen';
import AddScreen from 'views/tasks/AddScreen';
import FinishedTasksScreen from 'views/tasks/FinishedTasksScreen';
import UpdateScreen from 'views/tasks/UpdateScreen';
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
