import React from 'react';
import {COLORS} from "../colors";
import {Col, Container, Row} from "react-bootstrap";
import * as rs from "../Responsive";
import landingPicture from "../media/landingPicture.jpg";

export default function About() {
    return (
        <Container
            fluid
            className="Landing"
            style={{
                padding: 0,
                backgroundColor: COLORS.accent,
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
                                This app was made as a third year group project by team CS29.

                                If you need to get in touch please shoot us an email at
                                <a href={"mailto: cs29tp@gmail.com."}> cs29tp@gmail.com </a>
                            </p>

                            <p className="smallText">
                                If the maintainers of the site will change this page will reflect the change (hopefully)
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