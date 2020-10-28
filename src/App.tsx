import 'css/app.css';
import 'normalize.css';
import React from 'react';
import { Provider } from 'react-redux';
import { MainRouter } from 'modules/router';
import { Loading } from 'modules/loading/components';
import { store } from 'modules/redux-store';

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
