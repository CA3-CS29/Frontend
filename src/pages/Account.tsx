import React, {useContext} from 'react';
import {COLORS} from '../colors';
import '../App.css';
import {useHistory} from 'react-router-dom';
import {FirebaseContext, IFirebaseContext} from '../FirebaseContext';
import {Button, Container, Row} from 'react-bootstrap';
import {AuthContext} from '../App';
import axios from "axios";
import {ApiEndPoints} from "../ApiEndpoints";


export default function Account() {
    let history = useHistory();
    const firebaseContext: IFirebaseContext = useContext(FirebaseContext);
    const Auth = useContext(AuthContext);

    firebaseContext.firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            history.push("/");
        }
    });

    let user = firebaseContext.firebase.auth().currentUser;
    const auth = firebaseContext.firebase.auth();
    let emailString;
    let email: string | null;

    if (user != null) {
        email = user.email;
        emailString = user.email;
    }

    const sendResetEmail = (event: { preventDefault: () => void; }) => {
        if (email) {
            event.preventDefault();
            auth.sendPasswordResetEmail(email).then(() => {
                alert("Check your email for a password reset link")
            })
                .catch(() => {
                    alert("Error")
                });
        }
    };

    const deleteAccount = (event: { preventDefault: () => void; }) => {
        user = firebaseContext.firebase.auth().currentUser;
        if (window.confirm("Are you sure you want to delete this account?")) {
            if (user) {
                event.preventDefault();
                user.delete().then(function () {
                    axios({
                        method: 'post',
                        url: ApiEndPoints.deleteAccount + firebaseContext.firebase.auth().currentUser?.uid,
                    });
                    alert("Account deleted")
                    Auth.setLoggedIn(false);
                    localStorage.setItem("isLoggedIn", JSON.stringify(false));
                    history.push("/");
                }).catch(function (error) {
                    alert(error)
                });
            }
        }
    }


    return (
        <Container
            fluid
            className="Landing"
            style={{
                padding: 0,
                backgroundColor: COLORS.accent,
            }}>
            <Container>
                <Row>
                    <h1 className="bigText"
                        style={{
                            color: COLORS.darkText,
                        }}>
                        Your Account
                    </h1>
                </Row>
                <hr/>
                <Row>
                    <h2 className="MediumText"
                        style={{
                            color: COLORS.darkText,
                        }}>
                        Your Email
                    </h2>
                </Row>
                <Row>

                    <p className="SmallText"
                       style={{
                           color: COLORS.darkText,
                       }}>
                        {emailString}
                    </p>
                </Row>


                <hr/>
                <Row>
                    <h2 className="MediumText"
                        style={{
                            color: COLORS.darkText,
                        }}>
                        Password
                    </h2>
                </Row>
                <Row>
                    <Button
                        className="Button"
                        style={{
                            color: COLORS.darkText,
                            backgroundColor: COLORS.secondaryAccent,
                            borderColor: COLORS.secondaryAccent,
                            fontFamily: "lato",
                            fontSize: "1.5vw",
                        }}
                        onClick={sendResetEmail}>
                        Change Password
                    </Button>
                </Row>

                <hr/>
                <Row>
                    <h2 className="MediumText"
                        style={{
                            color: COLORS.darkText,
                        }}>
                        Delete Your Account
                    </h2>
                </Row>
                <Row>
                    <Button
                        className="Button"
                        style={{
                            color: COLORS.lightText,
                            backgroundColor: "#D91212",
                            borderColor: "#D91212",
                            fontFamily: "lato",
                            fontSize: "1.5vw",
                        }}
                        onClick={deleteAccount}>
                        Delete Account
                    </Button>
                </Row>
            </Container>
        </Container>
    );
}
