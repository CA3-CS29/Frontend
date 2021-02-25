import React from 'react';
import {COLORS} from '../colors';
import '../App.css';
import './Portfolio.css';
import {Badge, Container, Row, Tab, Tabs} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';

import BarChart from "../charts/BarChart";
import BubbleChart from "../charts/BubbleChart";
import {Office, Entry} from "../Interfaces";

export default function VisualiseOffice(props: { location: { state: { office: Office } } }) {
    const office = props.location.state.office;
    const entries: Entry[] = office.entries;

    return (
        <Container
            fluid
            className="Landing"
            style={{
                padding: 0,
                backgroundColor: COLORS.background,
            }}>
            <Container>
                <Row>
                    <div>
                        <h1 className="MediumText"
                            style={{
                                color: COLORS.darkText,
                                textAlign: "left",
                                marginBottom: 0,
                            }}
                        >
                            {office.name}
                        </h1>
                        <h4
                            style={{
                                textAlign: "left",
                            }}
                        >
                            <Badge
                                style={{
                                    backgroundColor: COLORS.primary,
                                    color: COLORS.lightText,
                                    fontWeight: "normal",
                                }}
                            >
                                Office
                            </Badge>
                        </h4>
                        <Tabs
                            defaultActiveKey="bar-chart"
                            id="chart-tabs"
                            mountOnEnter={true}
                            unmountOnExit={true}
                            transition={false}
                        >
                            <Tab
                                eventKey="bar-chart"
                                title="Bar Chart"
                                style={{backgroundColor: COLORS.background}}
                            >
                                <BarChart entries={entries}/>
                            </Tab>
                            <Tab
                                eventKey="bubble-chart"
                                title="Bubble Chart"
                                style={{backgroundColor: COLORS.background}}
                            >
                                <BubbleChart entries={entries}/>
                            </Tab>
                        </Tabs>
                    </div>
                </Row>
            </Container>
        </Container>
    )
}