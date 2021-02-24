import React, {useState} from 'react';
import {COLORS} from '../colors';
import '../App.css';
import {Button, Container, Row} from 'react-bootstrap';
import {useAuthStore} from '../App';
import axios from "axios";
import {ApiEndPoints} from "../ApiEndpoints";
import {AlertInfo, AlertViewer} from "./Alerts";


export default function Account() {

    const user = useAuthStore(state => state.user);
    const firebase = useAuthStore(state => state.firebase);

    const [alerts, setAlerts] = useState<AlertInfo[]>([]);

    let emailString;
    let email: string | null;

    // this condition is probably redundant
    if (user != null) {
        email = user.email;
        emailString = user.email;
    }

    const sendResetEmail = (event: { preventDefault: () => void; }) => {
        if (email) {
            event.preventDefault();
            firebase.auth().sendPasswordResetEmail(email)
                .then(() => {
                    const successAlert: AlertInfo = {
                        variant: "success",
                        text: "Check your email for a password reset link"
                    };
                    setAlerts([...alerts, successAlert]);
                })
                .catch((error) => {
                    const errorAlert: AlertInfo = {variant: "danger", text: error.toString()};
                    setAlerts([...alerts, errorAlert]);
                    console.log(error);
                });
        }
    };

    const deleteAccount = (event: { preventDefault: () => void; }) => {
        if (window.confirm("Are you sure you want to delete this account?")) { /* Replace with alert? */
            // this condition is probably redundant
            if (user) {
                event.preventDefault();
                user
                    .delete()
                    .then(function () {
                        axios({
                            method: 'post',
                            url: ApiEndPoints.deleteAccount + user?.uid,
                        });
                        const successAlert: AlertInfo = {variant: "success", text: "Account deleted"};
                        setAlerts([...alerts, successAlert]);
                    })
                    .catch((error) => {
                        const errorAlert: AlertInfo = {variant: "danger", text: error.toString()};
                        setAlerts([...alerts, errorAlert]);
                        console.log(error);
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
            }}
        >
            <Container>
                <AlertViewer alerts={alerts} setAlerts={setAlerts}/>
                <Row>
                    <h1 className="bigText"
                        style={{
                            color: COLORS.darkText,
                        }}
                    >
                        Your Account
                    </h1>
                </Row>
                <hr/>
                <Row>
                    <h2 className="MediumText"
                        style={{
                            color: COLORS.darkText,
                        }}
                    >
                        Your Email
                    </h2>
                </Row>
                <Row>
                    <p
                        className="SmallText"
                        style={{
                            color: COLORS.darkText,
                        }}
                    >
                        {emailString}
                    </p>
                </Row>
                <hr/>
                <Row>
                    <h2 className="MediumText"
                        style={{
                            color: COLORS.darkText,
                        }}
                    >
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
                        onClick={sendResetEmail}
                    >
                        Change Password
                    </Button>
                </Row>
                <hr/>
                <Row>
                    <h2 className="MediumText"
                        style={{
                            color: COLORS.darkText,
                        }}
                    >
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
                        onClick={deleteAccount}
                    >
                        Delete Account
                    </Button>
                </Row>
            </Container>
        </Container>
    )
}
