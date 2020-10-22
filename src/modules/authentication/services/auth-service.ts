import { FirebaseService } from 'modules/firebase';
import { login } from '../const';
import * as H from 'history';
import { AppRoute } from 'const';

export const AuthService = {
    login: async (email: string, password: string): Promise<boolean> => {
        const firebase = FirebaseService.Instance;
        const firebaseAuth = firebase.auth();
        try {
            await firebaseAuth.signInWithEmailAndPassword(email, password);
            const userId = AuthService.getUserUid();
            login(userId);
            return true;
        } catch (e) {
            return false;
        }
    },
    register: async (
        email: string,
        password: string,
        history?: H.History
    ): Promise<boolean> => {
        const firebase = FirebaseService.Instance;
        const firebaseAuth = firebase.auth();
        try {
            await firebaseAuth.createUserWithEmailAndPassword(email, password);
            history && history.push(AppRoute.Home);
            return true;
        } catch (e) {
            return false;
        }
    },
    getUserUid: (): string => {
        const firebase = FirebaseService.Instance;
        const firebaseAuth = firebase.auth();
        const user = firebaseAuth.currentUser;
        if (user) return user.uid;
        return 'guest';
    },
    anonymousLogin: () => {
        const firebase = FirebaseService.Instance;
        firebase.auth().signInAnonymously();
    },
};
