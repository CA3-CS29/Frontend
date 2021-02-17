import firebase from 'firebase';
import React from 'react';

// Firebase configuration loaded from env variables
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DB_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export interface IFirebaseContext {
    firebase: firebase.app.App,
    authProviders: string[]
    isLoggedIn: boolean,

}



export const FirebaseContext = React.createContext({} as IFirebaseContext)

export const FirebaseProvider = ({children}: any) => {
    return (
        <div>
            <FirebaseContext.Provider
                value={{ 'firebase': firebase.app(), authProviders: ["Firebase"]} as IFirebaseContext}>
                {children}
            </FirebaseContext.Provider>
        </div>
    );
}
