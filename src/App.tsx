import React from 'react';
import MainRouter from './const/router/MainRouter';
import { Provider } from 'react-redux';
import store from './modules/redux-store/store';
import Loading from './components/Loading';
import { firebaseConfig } from './const/firebase';
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
