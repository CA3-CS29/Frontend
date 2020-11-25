import React from 'react';
import '../App.css';
import {COLORS} from '../colors';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { Form } from 'react-bootstrap';

export default function SignUp() {


    return (
        <div 
            className="Landing"
            style={{
                backgroundColor: COLORS.accent
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
                
                <Form>
                    <Form.Row>
                        <Form.Group controlId="signupEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>
                    
                    <Form.Row>
                        <Form.Group controlId="signupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Form.Row>
                        
                    <Button 
                        style={{
                        color: COLORS.darkText,
                        backgroundColor: COLORS.secondaryAccent,
                        fontFamily: 'Lato',
                        fontWeight: 'lighter',
                        fontSize: 25,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        display: "inline",
                        position: "absolute",
                        top: 400,
                        left: 300,
                    }}
                    as={Link} to="/signup"
                    >
                        Sign up
                </Button>
                    </Form>
            
            </Container>
        
        </div>);
}