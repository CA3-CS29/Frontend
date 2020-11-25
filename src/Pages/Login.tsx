import React from 'react';
import '../App.css';
import {COLORS} from '../colors';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { Form } from 'react-bootstrap';

export default function LogIn() {
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
                        Welcome Back

                    </h1>
                    <br> 
                    </br>   
                </Row>
                
                <Form>
                    <Form.Row>
                        <Form.Group controlId="loginEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>
                    
                    <Form.Row>
                        <Form.Group controlId="loginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Form.Row>
                        
 
                        <Button className="Button"
                            style={{
                                color: COLORS.darkText,
                                backgroundColor: COLORS.highlight,
                                borderColor: COLORS.highlight,

                                display: "inline",
                                position: "absolute",
                                top: 400,
                                left: 200,
                            }}
                            as={Link} to="/login"
                            >
                                Log in
                        </Button>
                    </Form>
            </Container>
        
        </div>);
}