import React from 'react';
import MainRouter from './router/MainRouter';
import { Provider } from 'react-redux';
import store from './store';
import Loading from './common/Loading';

function App() {
    return (
        <Provider store={store}>
            <Loading>
                <MainRouter />
            </Loading>
        </Provider>
    );
}

export default App;
