import React, {useContext, useState} from 'react';
import '../App.css';
import {COLORS} from '../colors';
import './Header.css'
import {FirebaseContext, IFirebaseContext} from "../FirebaseContext";
import {Link} from 'react-router-dom';
import {AuthContext} from '../App';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import {AlertInfo, AlertViewer} from "./Alerts";


export default function HeaderLoggedIn(props: { logoText: string }) {
    const [alerts, setAlerts] = useState<AlertInfo[]>([]);

    function ButtonsLoggedIn() {
        const firebaseContext: IFirebaseContext = useContext(FirebaseContext);
        const Auth = useContext(AuthContext);

        return (
            <div>
                <Button
                    className="Button mr-1"
                    style={{
                        color: COLORS.darkText,
                        backgroundColor: COLORS.highlight,
                        borderColor: COLORS.highlight,

                    }}
                    as={Link} to="/create-portfolio"
                >
                    Create Portfolio
                </Button>
                <Button
                    className="Button mr-1"
                    style={{
                        color: COLORS.darkText,
                        backgroundColor: COLORS.highlight,
                        borderColor: COLORS.highlight,
                    }}
                    as={Link} to="/account"
                >
                    Account
                </Button>
                <Button
                    className="Button mr-1"
                    style={{
                        color: COLORS.darkText,
                        backgroundColor: COLORS.highlight,
                        borderColor: COLORS.highlight,

                    }}
                    onClick={() => {
                        firebaseContext.firebase.auth()
                            .signOut()
                            .then(() => {
                                Auth.setLoggedIn(false);
                                localStorage.setItem("isLoggedIn", JSON.stringify(false));
                                alert("Successfully signed out."); /* Push custom alert to landing page? */
                            })
                            .catch((error) => {
                                const errorAlert: AlertInfo = {variant: "danger", text: error.toString()};
                                setAlerts(oldAlerts => [...oldAlerts, errorAlert]);
                                console.log(error);
                            });
                    }}
                >
                    Sign out
                </Button>
            </div>
        )
    }

    return (
        <>
            <Navbar
                style={{
                    backgroundColor: COLORS.primary,
                    color: COLORS.lightText,
                    fontFamily: 'Lato',
                    height: 45,
                }}
                className="Header"
            >
                <Nav className="mr-auto">
                    <Navbar.Brand
                        style={{
                            color: COLORS.lightText,
                            fontFamily: 'Lato',
                            fontWeight: 'lighter',
                            fontSize: 40,
                        }}
                        as={Link} to="/"
                    >
                        {props.logoText}
                    </Navbar.Brand>
                </Nav>
                <ButtonToolbar>

                    <ButtonsLoggedIn/>

                </ButtonToolbar>
            </Navbar>
            <AlertViewer alerts={alerts}/>
        </>
    )

}


