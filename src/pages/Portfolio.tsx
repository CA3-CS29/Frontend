import React, {useEffect, useState} from 'react';
import {COLORS} from '../colors';
import '../App.css';
import './Portfolio.css';
import {Link} from 'react-router-dom';
import axios from 'axios'
import {ApiEndPoints} from "../ApiEndpoints";
import {Accordion, Button, Card, Col, Container, ListGroup, Row} from 'react-bootstrap'
import {AlertInfo, AlertViewer} from "./Alerts";

import 'bootstrap/dist/css/bootstrap.min.css';
import AddEntry from "./AddEntry";
import AddRegion from "./AddRegion";
import AddOffice from "./AddOffice";
import {useAuthStore} from "../App";
import firebase from "firebase";
import {Entry, Office, Region} from "../Interfaces";


export default function Portfolio(props: { match: { params: { tag: string } } }) {
    const user = useAuthStore(state => state.user) as firebase.User;
    const [dataRetrieved, setDataRetrieved] = useState(false);

    const {tag} = props.match.params;
    const [status, setStatus] = useState("");
    const [portfolioId, setPortfolioId] = useState("");
    const [numRegions, setNumRegions] = useState(0);
    const [regions, setRegions] = useState([]);

    const [alerts, setAlerts] = useState<AlertInfo[]>([]);

    const getPortfolioURL = ApiEndPoints.getPortfolio + tag + "/" + user?.uid;

    useEffect(() => {
        console.log("Sending request:", getPortfolioURL);
        axios.get(getPortfolioURL)
            .then((response) => {
                const data = response.data;
                console.log(data);

                setStatus(data.status);
                if (data.payload) {
                    setPortfolioId(data.payload.portfolio_id);
                    setNumRegions(data.payload.num_regions);
                    setRegions(data.payload.regions);
                } else {
                    const noPortfolioAlert: AlertInfo = {
                        variant: "danger",
                        text: `There is no portfolio named "${tag}"`
                    };
                    setAlerts(oldAlerts => [...oldAlerts, noPortfolioAlert]);
                }
                setDataRetrieved(true);
            })
            .catch((error) => {
                const errorAlert: AlertInfo = {variant: "danger", text: error.toString()};
                setAlerts(oldAlerts => [...oldAlerts, errorAlert]);
                console.log(error);
            });
    }, [getPortfolioURL, tag])


    function RegionListItems(props: { regions: Region[] }) {
        const regions = props.regions;

        return <>
            {regions.map((region) =>
                <Card key={region.region_id}>
                    <Card.Header style={{paddingTop: 0, paddingBottom: 0}}>
                        <Row>
                            <Accordion.Toggle
                                as={Col}
                                eventKey="0"
                                style={{textAlign: "left", paddingTop: 12, paddingBottom: 12}}
                            >
                                <h4>{region.name}</h4>
                                {region.region_id}
                            </Accordion.Toggle>
                            <Col xs="auto" style={{paddingTop: 12, paddingBottom: 12}}>
                                <div>
                                    <AddOffice
                                        accountID={user.uid}
                                        portfolioID={portfolioId}
                                        regionID={region.region_id}
                                        setAlerts={setAlerts}
                                    />
                                    <Button
                                        className="Button mr-1 mt-1"
                                        style={{
                                            color: COLORS.darkText,
                                            backgroundColor: COLORS.highlight,
                                            borderColor: COLORS.highlight,
                                            float: 'right',
                                        }}
                                    >
                                        Visualise
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body style={{padding: 5}}>

                            <OfficeListItems region={region}/>

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            )}
        </>
    }

    function OfficeListItems(props: { region: Region }) {
        const offices = props.region.offices;
        const region = props.region;

        if (offices) {
            const mappedOffices = offices.map((office: Office) =>
                <ListGroup.Item key={office.office_id} style={{paddingTop: 0}}>
                    <Accordion defaultActiveKey="0" style={{width: '100%'}}>
                        <Row>
                            <Accordion.Toggle
                                as={Col}
                                eventKey="0"
                                style={{paddingTop: 12}}
                            >
                                <h5 style={{textAlign: "left"}}>
                                    {office.name}
                                </h5>
                            </Accordion.Toggle>
                            <Col xs="auto" style={{paddingTop: 12}}>
                                <Button
                                    className="Button mr-1"
                                    style={{
                                        color: COLORS.darkText,
                                        backgroundColor: COLORS.highlight,
                                        borderColor: COLORS.highlight,
                                        float: "right",
                                    }}
                                    as={Link}
                                    to={{
                                        pathname: "/visualise-office",
                                        state: { office: office }
                                    }}
                                >
                                    Visualise
                                </Button>
                                <AddEntry
                                    accountID={user.uid}
                                    portfolioID={portfolioId}
                                    regionID={region.region_id}
                                    officeID={office.office_id}
                                    officeTag={office.name}
                                    setAlerts={setAlerts}
                                />
                            </Col>
                        </Row>
                        <Accordion.Collapse eventKey="0">

                            <EntryListItems office={office}/>

                        </Accordion.Collapse>
                    </Accordion>
                </ListGroup.Item>
            );
            return <ListGroup variant="flush">{mappedOffices}</ListGroup>
        } else {
            return <div>No office here just yet</div>
        }
    }

    function EntryListItems(props: { office: Office }) {
        if (props.office.entries && props.office.entries.length > 0) {
            const mappedEntries = props.office.entries.map((entry: Entry) =>
                <ListGroup.Item key={entry.entry_id}>
                    <Row>
                        <Col>entry.tag</Col>
                        <Col>entry.consumption</Col>
                        <Col>entry.source</Col>
                        <Col>entry.info</Col>
                        {/*TODO: Update this once we have entries in the database*/}
                    </Row>
                </ListGroup.Item>
            );
            return <ListGroup variant="flush">{mappedEntries}</ListGroup>
        } else {
            return <div>No entries in this office yet</div>
        }
    }

    function Body() {
        if (dataRetrieved) {
            return (
                <Container>
                    <AlertViewer alerts={alerts}/>
                    <Row style={{paddingTop: 10, paddingBottom: 10}}>
                        <Col>
                            <h1 className="MediumText" style={{color: COLORS.darkText, textAlign: "left"}}>
                                {tag}
                            </h1>
                        </Col>
                        <Col xs="auto">
                            <AddRegion
                                accountID={user.uid}
                                portfolioID={portfolioId}
                                setAlerts={setAlerts}
                            />
                            <Button
                                className="Button mr-1 mt-1"
                                style={{
                                    color: COLORS.darkText,
                                    backgroundColor: COLORS.highlight,
                                    borderColor: COLORS.highlight,
                                    float: 'right',
                                }}
                                // as={Link} to="/create-portfolio"
                            >
                                Visualise
                            </Button>

                        </Col>
                    </Row>
                    <Row>
                        <Card
                            style={{
                                padding: 21,
                                marginBottom: 20,
                                width: '100%',
                                textAlign: "left",
                            }}
                        >
                            This is a paragraph about the portfolio<br/>
                            Status: {status}<br/>
                            Portfolio ID: {portfolioId}<br/>
                            Number of regions: {numRegions}<br/>
                        </Card>
                    </Row>
                    <Row>
                        <Accordion defaultActiveKey="0" style={{width: '100%'}}>
                            <RegionListItems regions={regions}/>
                        </Accordion>
                    </Row>
                </Container>
            )
        } else {
            return (
                <></>
            )
        }
    }

    return (
        <Container
            fluid
            className="Landing"
            style={{
                padding: 0,
                backgroundColor: COLORS.background,
            }}>
            <Body/>
        </Container>
    )
}