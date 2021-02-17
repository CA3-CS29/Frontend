import React, {useContext} from 'react';
import {COLORS} from '../colors';
import '../App.css';
import {Link} from 'react-router-dom';
import {FirebaseContext, IFirebaseContext} from '../FirebaseContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import {AuthContext} from "../App";

export default function Portfolios() {
    const firebaseContext: IFirebaseContext = useContext(FirebaseContext);

    const Auth = useContext(AuthContext);

    firebaseContext.firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            Auth.setLoggedIn(false);
            localStorage.setItem("isLoggedIn", JSON.stringify(false));
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

                    as={Link} to="/portfolio/portfolio"
            >
                portfolio
            </Button>
        </div>

    );

}