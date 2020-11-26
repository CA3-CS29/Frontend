import React, {useContext, useState} from 'react';
import '../App.css';
import { COLORS } from '../colors';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { FirebaseContext, IFirebaseContext } from "../FirebaseContext";
import { useHistory } from "react-router-dom";

import landingPicture from '../media/landingPicture.jpg'


export default function SignUp() {
    let history = useHistory();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const firebaseContext: IFirebaseContext = useContext(FirebaseContext);

    if (firebaseContext.firebase.auth().currentUser) {
        history.push("/");
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            await firebaseContext.firebase.auth().createUserWithEmailAndPassword(email, password);
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
            <Row
                style={{
                    margin: 0,
                }}>
                <Col
                    xs={8}
                    style={{
                        padding: 0,
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
                                <Form.Group controlId="signupEmail">
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
                                <Form.Group controlId="signupPassword">
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
                                        display: "inline",
                                        position: "absolute",
                                        top: 400,
                                        left: 300,
                                    }}>
                                Sign up
                            </Button>
                        </Form>
                    </Container>
                </Col>

                <Col
                    style={{
                        padding: 0,
                    }}>
                    <img src={landingPicture}
                         alt="Leaves"
                         style={{
                             position: "absolute",
                             right: 0,
                             maxWidth: "100%",
                         }}/>
                </Col>
            </Row>


        </Container>);
}