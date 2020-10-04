import React from 'react';
import MainRouter from './router/MainRouter';
import { Provider } from 'react-redux';
import store from './store';
import Loading from './common/Loading';
import { firebaseConfig } from './firebase';
import firebase from 'firebase/app';

function App() {
    firebaseConfig.firestore().settings({
        cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
    });
    firebase.firestore().enablePersistence();

    return (
        <Provider store={store}>
            <Loading>
                <MainRouter />
            </Loading>
        </Provider>
    );
}

export default App;
