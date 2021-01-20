import React, { useContext } from 'react';
import { COLORS } from '../colors';
import '../App.css';
import { useHistory } from 'react-router-dom';
import { FirebaseContext, IFirebaseContext } from '../FirebaseContext';



export default function Portfolios() {
    let history = useHistory();
    const firebaseContext: IFirebaseContext = useContext(FirebaseContext);


    firebaseContext.firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            history.push("/");
        }
    });

    


    return (
        <h1 className="MediumText"
            style={{
                color: COLORS.darkText,
            }}>
            Portfolios
        </h1>
    );
  
}