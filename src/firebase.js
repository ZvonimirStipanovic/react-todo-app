import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const firebaseConfig = firebase.initializeApp({
    apiKey: 'AIzaSyABIJrz8tkiIR6pdvEnAYtawTl61omyCXE',
    authDomain: 'todo-app-89acd.firebaseapp.com',
    databaseURL: 'https://todo-app-89acd.firebaseio.com',
    projectId: 'todo-app-89acd',
    storageBucket: 'todo-app-89acd.appspot.com',
    messagingSenderId: '379396228176',
    appId: '1:379396228176:web:371890331b2d8790b0fd55',
    measurementId: 'G-13RB5SFQ1Z',
});
