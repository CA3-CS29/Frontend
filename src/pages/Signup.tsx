import React, {useContext, useState} from 'react';
import '../App.css';

import {COLORS} from '../colors';
import * as rs from "../Responsive";
import landingPicture from "../media/landingPicture.jpg";

import axios from 'axios';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {FirebaseContext, IFirebaseContext} from "../FirebaseContext";
import {useHistory} from "react-router-dom";
import {ApiEndPoints} from "../ApiEndpoints";
import { AuthContext } from '../App';


export default function SignUp() {
    let history = useHistory();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const firebaseContext: IFirebaseContext = useContext(FirebaseContext);

    const Auth = useContext(AuthContext);

    if (firebaseContext.firebase.auth().currentUser) {
        history.push("/");
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            await firebaseContext.firebase.auth().createUserWithEmailAndPassword(email, password);
            axios({
                method: 'post',
                url: ApiEndPoints.createAccount + firebaseContext.firebase.auth().currentUser?.uid,
            });
            Auth.setLoggedIn(true);
            history.push("/");
        } catch (error) {
            alert(error);
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
            <Row style={{
                boxSizing: "border-box",
                display: "flex",
                flexWrap: "wrap",
                margin: 0,
                height: "100%",
                flexDirection: [rs.IsPhone(), rs.IsTabletPortrait()].some(Boolean) ? "column" : "row",
                }}>
                <Col style={{
                    boxSizing: "border-box",
                    padding: "2em",
                    flex: [rs.IsPhone(), rs.IsTabletPortrait()].some(Boolean) ? "40%" : "70%",
                    }}>
                    <Container>
                        <Row>
                            <h1 className="bigText"
                                style={{
                                    color: COLORS.darkText,
                                }}>
                                Welcome
                            </h1>
                        </Row>
                        <Form onSubmit={handleSubmit}>
                            <Form.Row>
                                <Form.Group controlId="signupEmail"
                                            style={{
                                                margin: "auto",
                                                marginBottom: "1em",
                                            }}
                                >
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={event => setEmail(event.target.value)}
                                    />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group controlId="signupPassword"
                                            style={{
                                                margin: "auto",
                                                marginBottom: "1em",
                                            }}
                                >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={event => setPassword(event.target.value)}
                                    />
                                </Form.Group>
                            </Form.Row>

                            <Button className="Button"
                                    type="submit"
                                    style={{
                                        color: COLORS.darkText,
                                        backgroundColor: COLORS.secondaryAccent,
                                        borderColor: COLORS.secondaryAccent,
                                        marginTop: "1em",
                                    }}>
                                Sign up
                            </Button>
                        </Form>
                    </Container>
                </Col>

                <Col style={{
                    boxSizing: "border-box",
                    padding: 0,
                    background: "url(" + landingPicture + ") center no-repeat",
                    backgroundSize: "cover",
                    height: "100%",
                    flex: [rs.IsPhone(), rs.IsTabletPortrait()].some(Boolean) ? "60%" : "30%",
                }}> </Col>
            </Row>
        </Container>);
}