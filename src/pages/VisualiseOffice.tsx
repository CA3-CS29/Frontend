import React from 'react';
import {COLORS} from '../colors';
import '../App.css';
import './Portfolio.css';
import {Container, Row, Tab, Tabs} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';

import BarChart from "../charts/BarChart";
import BubbleChart from "../charts/BubbleChart";

export default function VisualiseOffice(
    props: {
        location: {
            state: {
                region: string,
                regionID: string,
                portfolio: string,
                portfolioID: string,
                office: string,
                officeID: string,
            }
        }
    }) {
    console.log(props);

    const entries = [
        {tag: "Bricks", consumption: 113, source: "Defra 2015", info: "Assuming 2.3 kg per brick."},
        {tag: "Glass", consumption: 412, source: "Defra 2015", info: ""},
        {
            tag: "Sand",
            consumption: 97,
            source: "EIO 106 Sector",
            info: "I don't like sand. It's coarse and rough and irritating and it gets everywhere."
        },
        {tag: "Fuel", consumption: 42, source: "Defra 2015", info: ""},
        {tag: "Refrigerant", consumption: 211, source: "ICE v2.0", info: ""},
        {tag: "Thorium", consumption: 0, source: "ICE v2.0", info: "Who added this?"},
        {tag: "Aluminium", consumption: 300, source: "Defra 2015", info: ""},
        {tag: "Leather", consumption: 21, source: "ICE v2.0", info: ""},
    ]

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
                            }}
                        >
                            {/*Portfolio: {portfolioTag}*/}
                            Glasgow Office
                        </h1>
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