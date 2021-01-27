import React, { useContext } from 'react';
import { COLORS } from '../colors';
import '../App.css';
import { useHistory } from 'react-router-dom';
import { FirebaseContext, IFirebaseContext } from '../FirebaseContext';

import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'

export default function Portfolios() {
    let history = useHistory();
    const firebaseContext: IFirebaseContext = useContext(FirebaseContext);

    firebaseContext.firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            history.push("/");
        }
    });

    return (
        <div>
            <h1 className="MediumText"
                style={{
                    color: COLORS.darkText,
                }}>
                Portfolios
            </h1>
            
            <Button className="Button mr-1"
                style={{
                    color: COLORS.darkText,
                    backgroundColor: COLORS.highlight,
                    borderColor: COLORS.highlight,
                }}

                as={Link} to="/portfolio/yolo swafegadf"
            >
                portfolio
            </Button>
        </div>
        
    );
  
}