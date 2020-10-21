import 'firebase/auth';
import 'firebase/storage';
import 'firebase/functions';

import { auth, initializeApp } from 'firebase';

import * as env from '../env';

export class FirebaseService {
    private static instance: firebase.app.App;
    private static firebaseConfig = env.development;

    /** Expose this for reauthentication with firebaes needed for secure actions, i.e.: reauthenticateWithCredential */
    public static get AuthProvider() {
        return auth.EmailAuthProvider;
    }

    public static get FunctionsProvider() {
        const functions = this.Instance.functions();
        // if (process.env.NODE_ENV === 'development') {
        //   functions.useFunctionsEmulator('http://localhost:5001');
        // }

        return functions;
    }

    public static CreateHttpsCallable(functionName: string) {
        return this.FunctionsProvider.httpsCallable(functionName);
    }

    public static get Instance() {
        const firebaseEnv = process.env.REACT_APP_FIREBASE_ENV;
        if (firebaseEnv) {
            // eslint-disable-next-line import/namespace
            this.firebaseConfig = env.development;
        }

        return (
            this.instance ||
            (this.instance = initializeApp(this.firebaseConfig))
        );
    }
}
