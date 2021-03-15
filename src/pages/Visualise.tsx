import React from 'react';
import {COLORS} from '../colors';
import '../App.css';
import './Portfolio.css';
import {Badge, Card, Container, Nav, Tab} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';

import BarChart from "../charts/BarChart";
import BubbleChart from "../charts/BubbleChart";
import {AccountPortfolios, Entry, Office, Portfolio, Region} from "../Interfaces";
import HierarchicalBubbleChart from "../charts/HierarchicalBubbleChart";

export default function Visualise(props: { location: { state: { data: AccountPortfolios | Portfolio | Region | Office } } }) {
    const data = props.location.state.data;

    function getEntriesFromRegion(region: Region) {
        let entries: Entry[] = [];
        for (const office of region.offices) {
            if (office.entries) {
                entries = [...entries, ...office.entries];
            }
        }
        return entries;
    }

    function getEntriesFromPortfolio(portfolio: Portfolio) {
        let entries: Entry[] = [];
        for (const region of portfolio.regions) {
            entries = [...entries, ...getEntriesFromRegion(region)];
        }
        return entries;
    }

    function getEntriesFromAccount(account: AccountPortfolios) {
        let entries: Entry[] = [];
        for (const portfolio of account.portfolios) {
            entries = [...entries, ...getEntriesFromPortfolio(portfolio)];
        }
        return entries;
    }

    let entries: Entry[];
    if ("portfolios" in data) {
        entries = getEntriesFromAccount(data);
    } else if ("regions" in data) {
        entries = getEntriesFromPortfolio(data);
    } else if ("offices" in data) {
        entries = getEntriesFromRegion(data);
    } else {
        entries = data.entries;
    }

    return (
        <Container
            fluid
            style={{
                backgroundColor: COLORS.background,
                height: "100%",
                position: "fixed",
            }}
        >
            <h1 className="MediumText"
                style={{
                    color: COLORS.darkText,
                    textAlign: "left",
                    marginBottom: 0,
                }}
            >
                {"regions" in data ? data.tag : data.name}
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
                    {"portfolios" in data ? "Account"
                        : "regions" in data ? "Portfolio"
                            : "offices" in data ? "Region"
                                : "Office"}
                </Badge>
            </h4>
            <Tab.Container
                defaultActiveKey="bar-chart"
                mountOnEnter={true}
                unmountOnExit={true}
                transition={false}
            >
                <Card>
                    <Card.Header>
                        <Nav variant="tabs">
                            <Nav.Item>
                                <Nav.Link eventKey="bar-chart">
                                    Bar Chart
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="bubble-chart">
                                    Bubble Chart
                                </Nav.Link>
                            </Nav.Item>
                            {"entries" in data ||
                            <Nav.Item>
                                <Nav.Link eventKey="hierarchical-bubble-chart">
                                    Hierarchical Bubble Chart
                                </Nav.Link>
                            </Nav.Item>
                            }
                        </Nav>
                    </Card.Header>
                    <Tab.Content as={Card.Body}>
                        <Tab.Pane eventKey="bar-chart" style={{backgroundColor: COLORS.background}}>
                            <BarChart entries={entries}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="bubble-chart" style={{backgroundColor: COLORS.background}}>
                            <BubbleChart entries={entries} colourProperty={(entry) => entry.office_id}/>
                        </Tab.Pane>
                        {"entries" in data ||
                        <Tab.Pane eventKey="hierarchical-bubble-chart" style={{backgroundColor: COLORS.background}}>
                            <HierarchicalBubbleChart data={data}/>
                        </Tab.Pane>
                        }
                    </Tab.Content>
                </Card>
            </Tab.Container>
        </Container>
    )
}