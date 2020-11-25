import firebase from 'firebase';
import React from "react";

// Firebase configuration loaded from env variables
const firebaseConfig = {
    apiKey: "AIzaSyAxmxwscM4xp7aFYrSUvktm1-QRjZboAoY",
    authDomain: "ca3-frontend.firebaseapp.com",
    databaseURL: "https://ca3-frontend.firebaseio.com",
    projectId: "ca3-frontend",
    storageBucket: "ca3-frontend.appspot.com",
    messagingSenderId: "182285255213",
    appId: "1:182285255213:web:39d2868c5f88e0a445aea4",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export interface IFirebaseContext {
    firebase: firebase.app.App,
    authProviders: string[]
}

export const FirebaseContext = React.createContext({} as IFirebaseContext)

export const FirebaseProvider = ({children}: any) => {
    return (
        <div>
            <FirebaseContext.Provider
                value={{'firebase': firebase.app(), authProviders: ["Firebase"]} as IFirebaseContext}>
                {children}
            </FirebaseContext.Provider>
        </div>
    );
}
