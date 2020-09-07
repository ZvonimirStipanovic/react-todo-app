import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginScreen from '../modules/LoginScreen';
import RegisterScreen from '../modules/RegisterScreen';

function MainRouter() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={LoginScreen} />
            <Route exact path="/register" component={RegisterScreen} />
        </BrowserRouter>
    );
}

export default MainRouter;
