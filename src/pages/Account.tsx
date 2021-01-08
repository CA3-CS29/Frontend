import React, { useContext} from 'react';
import { COLORS } from '../colors';
import './Responsive.css'
import '../App.css';
import { useHistory } from 'react-router-dom';
import { FirebaseContext, IFirebaseContext } from '../FirebaseContext';
import {Container, Row, Button } from 'react-bootstrap';
import { AuthContext } from '../App';



export default function Account() {
    let history = useHistory();
    const firebaseContext: IFirebaseContext = useContext(FirebaseContext);
    const Auth = useContext(AuthContext);

    if (!firebaseContext.firebase.auth().currentUser) {
        history.push("/");
    }

    var user = firebaseContext.firebase.auth().currentUser;
    var auth = firebaseContext.firebase.auth();
    var emailString;
    let email: string | null;
    

    if (user != null) {
        email = user.email;
        emailString = user.email;
    }

    const sendResetEmail = (event: { preventDefault: () => void; }) => {
        if(email){
            event.preventDefault();
            auth.sendPasswordResetEmail(email).then(() => {
                    alert("Check your email for a password reset link")
                // Email sent.
                })
                .catch(() => {
                    // An error happened.
                    alert("Error")
                });
        }
    };



    const deleteAccount = (event: { preventDefault: () => void; }) => {
        user = firebaseContext.firebase.auth().currentUser;
        if(window.confirm("Are you sure you want to delete this account?")){
            if (user) {
                event.preventDefault();
                user.delete().then(function () {
                    alert("Account deleted")
                    Auth.setLoggedIn(false);
                    history.push("/");
                    // User deleted.
                    
                }).catch(function (error) {
                    // An error happened.
                    alert("Error")
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
            <Row className="responsiveRow">
                <Container>
                    <Row>
                        <h1 className="bigText"
                            style={{
                                color: COLORS.darkText,
                            }}>
                            Your Account
                            </h1>
                    </Row>
                    <hr></hr>
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


                    <hr></hr>
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
                            onClick={sendResetEmail} >
                            Change Password
                            </Button>
                    </Row>

                    <hr></hr>
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
                                color: COLORS.darkText,
                                backgroundColor: COLORS.secondaryAccent,
                                borderColor: COLORS.secondaryAccent,
                                fontFamily: "lato",
                                fontSize: "1.5vw",
                            }}
                            onClick={deleteAccount} >
                            Delete Account
                            </Button>
                    </Row>

                </Container>
            </Row>
        </Container>
    );
}