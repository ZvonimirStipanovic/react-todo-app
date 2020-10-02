import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginScreen from '../modules/LoginScreen';
import RegisterScreen from '../modules/RegisterScreen';
import PrivateRoute from './PrivateRoute';
import HomeScreen from '../modules/HomeScreen';
import AddScreen from '../modules/AddScreen';
import UpdateScreen from '../modules/UpdateScreen';

function MainRouter() {
    return (
        <BrowserRouter>
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/login" component={LoginScreen} />
            <PrivateRoute exact path="/" component={HomeScreen} />
            <PrivateRoute exact path="/add" component={AddScreen} />
            <PrivateRoute exact path="/update" component={UpdateScreen} />
        </BrowserRouter>
    );
}

export default MainRouter;
