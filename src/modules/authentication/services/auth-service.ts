import { FirebaseService } from 'modules/firebase';

export const AuthService = {
    login: async (email: string, password: string): Promise<boolean> => {
        const firebase = FirebaseService.Instance;
        const firebaseAuth = firebase.auth();
        try {
            await firebaseAuth.signInWithEmailAndPassword(email, password);
            return true;
        } catch (e) {
            return false;
        }
    },
    register: async (email: string, password: string): Promise<boolean> => {
        const firebase = FirebaseService.Instance;
        const firebaseAuth = firebase.auth();
        try {
            await firebaseAuth.createUserWithEmailAndPassword(email, password);
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
