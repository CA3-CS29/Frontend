import React from 'react';
import {COLORS} from '../colors';
import '../App.css';
import './Portfolio.css';
import {Container, Row, Tab, Tabs} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';

import BarChart from "../charts/BarChart";
import BubbleChart from "../charts/BubbleChart";
import {Office, Region} from "../Interfaces";

export default function VisualiseRegion(props: { location: { state: { region: Region } } }) {
    let region: Region = props.location.state.region;
    let offices: Office[] = region.offices;
    const entries = offices[0].entries;
    console.log(offices)

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
                            {region.name}
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