import React from 'react';
import MainRouter from './router/MainRouter';
import { Provider } from 'react-redux';
import store from './store';

function App() {
    return (
        <Provider store={store}>
            <MainRouter />
        </Provider>
    );
}

export default App;
