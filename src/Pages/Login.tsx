import React, {useContext, useState} from 'react';
import '../App.css';
import './Responsive.css';
import { COLORS } from '../colors';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { FirebaseContext, IFirebaseContext } from "../FirebaseContext";
import {AuthContext} from '../App';
import { useHistory } from "react-router-dom";



export default function LogIn(props: { user: any; onLogin: (arg0: any) => void; }) {
    let history = useHistory();

    const Auth = useContext(AuthContext);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const firebaseContext: IFirebaseContext = useContext(FirebaseContext);
    if (firebaseContext.firebase.auth().currentUser) {
        history.push("/");
        Auth.setLoggedIn(true);
    }


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            await firebaseContext.firebase.auth().signInWithEmailAndPassword(email, password);
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
            <Row className="responsiveRow">
                <Col className={"bodyColumn"}>
                    <Container>
                        <Row>
                            <h1 className="bigText"
                                style={{
                                    color: COLORS.darkText,
                                }}>
                                Welcome Back
                            </h1>
                            <br>
                            </br>
                        </Row>
                        <Form onSubmit={handleSubmit}>
                            <Form.Row>
                                <Form.Group controlId="signInEmail"
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
                                <Form.Group controlId="signInPassword"
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
                                Log in
                            </Button>
                        </Form>
                    </Container>
                </Col>

                <Col className={"leavesColumn"}> </Col>
            </Row>
        </Container>);
}