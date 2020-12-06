import React from 'react';
import { COLORS } from '../colors';
import './Landing.css';
import './Responsive.css'

import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Landing() {
    return (
        <Container
            fluid
            className="Landing"
            style={{
                padding: 0,
                backgroundColor: COLORS.accent,
            }}>
            <Row className="responsiveRow">
                <Col className="bodyColumn">
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
                            <p className="smallText"
                                style={{
                                    color: COLORS.darkText,
                                }}>
                                Carbon emission calculations and visualisations made easy.
                            </p>
                        </Row>
                    </Container>
                    <Row style={{
                        marginTop: "1em",
                        display: "flex",
                        flexWrap: "wrap",
                    }}>
                        <Col style={{ flex: "50%" }}>
                            <Button
                                className="Button"
                                size="lg"
                                style={{
                                    color: COLORS.darkText,
                                    backgroundColor: COLORS.highlight,
                                    borderColor: COLORS.highlight,
                                }}
                                as={Link} to="/login" >
                                Log in
                            </Button>
                        </Col>
                        <Col style={{ flex: "50%" }}>
                            <Button
                                className="Button"
                                size="lg"
                                style={{
                                    color: COLORS.darkText,
                                    backgroundColor: COLORS.secondaryAccent,
                                    borderColor: COLORS.secondaryAccent,
                                }}
                                as={Link} to="/signup" >
                                Sign up
                            </Button>
                        </Col>
                    </Row>
                </Col>

                <Col className="leavesColumn"> </Col>
            </Row>
        </Container>
    );
}