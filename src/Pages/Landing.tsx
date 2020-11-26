import React from 'react';
import { COLORS } from '../colors';
import './Landing.css';

import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import landingPicture from '../media/landingPicture.jpg'


export default function Landing(){
    return(
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

                    <Button className="Button"
                        size="lg"
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

                    <Button className="Button"
                        size="lg"
                        style={{
                            color: COLORS.darkText,
                            backgroundColor: COLORS.secondaryAccent,
                            borderColor: COLORS.secondaryAccent,
                            display: "inline",
                            position: "absolute",
                            top: 400,
                            left: 300,
                        }}
                        as={Link} to="/signup"
                        >
                            Sign up
                        </Button>

                    <Container>
                        <Row>
                            <h1 className="bigText"
                                style={{
                                    color: COLORS.darkText,
                                }}>
                                Carbon Analysis 3
                            </h1>
                        </Row>
                        <Row>
                            <p  className="smallText"
                                style={{
                                    color: COLORS.darkText,
                                }}>
                                Carbon emission calculations and visualisations made easy.
                            </p>
                        </Row>
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
        </Container>
    );
}