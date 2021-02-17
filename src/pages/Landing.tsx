import React from 'react';
import {COLORS} from '../colors';
import './Landing.css';
import * as rs from '../Responsive';
import landingPicture from '../media/landingPicture.jpg'

import {Button, Col, Container, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default function Landing() {
    return (
        <Container
            fluid
            className="Landing"
            style={{
                backgroundColor: COLORS.accent,
                padding: 0,
            }}
        >
            <Row
                style={{
                    boxSizing: "border-box",
                    display: "flex",
                    flexWrap: "wrap",
                    margin: 0,
                    height: "100%",
                    flexDirection: [rs.IsPhone(), rs.IsTabletPortrait()].some(Boolean) ? "column" : "row",
                }}
            >
                <Col
                    style={{
                        boxSizing: "border-box",
                        padding: "2em",
                        flex: [rs.IsPhone(), rs.IsTabletPortrait()].some(Boolean) ? "40%" : "70%",
                    }}
                >
                    <Container>
                        <Row>
                            <h1 className="bigText"
                                style={{
                                    color: COLORS.darkText,
                                }}
                            >
                                Carbon Analysis 3
                            </h1>
                        </Row>
                        <Row>
                            <p
                                className="smallText"
                                style={{
                                    color: COLORS.darkText,
                                }}
                            >
                                Carbon emission calculations and visualisations made easy.
                            </p>
                        </Row>
                    </Container>
                    <Row
                        style={{
                            marginTop: "1em",
                            display: "flex",
                            flexWrap: "wrap",
                        }}
                    >
                        <Col style={{flex: "50%"}}>
                            <Button
                                className="Button mr-1"
                                size="lg"
                                style={{
                                    color: COLORS.darkText,
                                    backgroundColor: COLORS.highlight,
                                    borderColor: COLORS.highlight,
                                }}
                                as={Link} to="/login"
                            >
                                Log in
                            </Button>
                            <Button
                                className="Button"
                                size="lg"
                                style={{
                                    color: COLORS.darkText,
                                    backgroundColor: COLORS.secondaryAccent,
                                    borderColor: COLORS.secondaryAccent,
                                }}
                                as={Link} to="/signup"
                            >
                                Sign up
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col
                    style={{
                        boxSizing: "border-box",
                        padding: 0,
                        background: "url(" + landingPicture + ") center no-repeat",
                        backgroundSize: "cover",
                        height: "100%",
                        flex: [rs.IsPhone(), rs.IsTabletPortrait()].some(Boolean) ? "60%" : "30%",
                    }}
                />
            </Row>
        </Container>
    )
}