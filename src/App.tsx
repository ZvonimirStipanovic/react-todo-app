import React from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import { firebaseConfig } from 'modules/firebase/components/firebase';
import { MainRouter } from 'modules/router';
import { Loading } from 'modules/loading/components';
import { store } from 'modules/redux-store';

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
