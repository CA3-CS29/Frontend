import React from 'react';
import {COLORS} from "../colors";
import {Col, Container, Row} from "react-bootstrap";

export default function About() {
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
                                This app was made as a third year group project by team CS29.

                                If you need to get in touch please shoot us an email at
                                <a href={"mailto: cs29tp@gmail.com."}> cs29tp@gmail.com </a>
                            </p>

                            <p className="smallText">
                                If the maintainers of the site will change this page will reflect the change (hopefully)
                            </p>
                        </Row>
                    </Container>
                    <Row style={{
                        marginTop: "1em",
                        display: "flex",
                        flexWrap: "wrap",
                    }}>
                    </Row>
                </Col>

                <Col className="leavesColumn"> </Col>
            </Row>
        </Container>
    );
}