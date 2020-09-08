import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginScreen from '../modules/LoginScreen';
import RegisterScreen from '../modules/RegisterScreen';
import PrivateRoute from './PrivateRoute';
import HomeScreen from '../modules/HomeScreen';

function MainRouter() {
    return (
        <BrowserRouter>
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/login" component={LoginScreen} />
            <PrivateRoute exact path="/" component={HomeScreen} />
        </BrowserRouter>
    );
}

export default MainRouter;
