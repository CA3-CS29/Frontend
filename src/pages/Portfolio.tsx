import React, {useEffect, useState} from 'react';
import {COLORS} from '../colors';
import '../App.css';
import './Portfolio.css';
import {Link} from 'react-router-dom';
import axios from 'axios'
import {ApiEndPoints} from "../ApiEndpoints";
import {Accordion, Badge, Button, Card, Col, Container, ListGroup, Row, Table} from 'react-bootstrap'
import {AlertInfo, AlertViewer} from "./Alerts";
import Pluralize from 'pluralize';

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
                                eventKey={region.region_id}
                                style={{textAlign: "left", paddingTop: 12, paddingBottom: 12}}
                            >
                                <Row>
                                    <h4>
                                        {region.name}
                                        <Badge
                                            style={{
                                                fontFamily: "Lato",
                                                color: COLORS.darkText,
                                                fontWeight: "normal",
                                                borderStyle: "solid",
                                                borderWidth: 1,
                                                marginLeft: 10,
                                            }}
                                        >
                                            {Pluralize("Office", region.num_offices, true)}
                                        </Badge>
                                    </h4>
                                </Row>
                                {region.region_id}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={region.region_id}>
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
                                                backgroundColor: "#ccf9ce",
                                                borderColor: "#ccf9ce",
                                                float: 'right',
                                            }}
                                        >
                                            Visualise
                                        </Button>
                                    </div>
                                </Col>
                            </Accordion.Collapse>
                        </Row>
                    </Card.Header>
                    <Accordion.Collapse eventKey={region.region_id}>
                        <Card.Body style={{padding: 5}}>
                            <Accordion style={{width: '100%'}}>
                                <OfficeListItems region={region}/>
                            </Accordion>
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
                    <Accordion.Toggle
                        as={Row}
                        eventKey={office.office_id}
                        style={{paddingTop: 12}}
                    >
                        <Col>
                            <Row>
                                <h5 style={{textAlign: "left"}}>
                                    {office.name}
                                    <Badge
                                        style={{
                                            fontFamily: "Lato",
                                            color: COLORS.darkText,
                                            fontWeight: "normal",
                                            borderStyle: "solid",
                                            borderWidth: 1,
                                            marginLeft: 10,
                                        }}
                                    >
                                        {Pluralize("Entry", office.num_entries, true)}
                                    </Badge>
                                </h5>
                            </Row>
                        </Col>
                        <Accordion.Collapse eventKey={office.office_id}>
                            <Col xs="auto">
                                <AddEntry
                                    accountID={user.uid}
                                    portfolioID={portfolioId}
                                    regionID={region.region_id}
                                    officeID={office.office_id}
                                    officeTag={office.name}
                                    setAlerts={setAlerts}
                                />
                                <Button
                                    className="Button mr-1"
                                    style={{
                                        color: COLORS.darkText,
                                        backgroundColor: "#ccf9ce",
                                        borderColor: "#ccf9ce",
                                        float: "right",
                                    }}
                                    as={Link}
                                    to={{
                                        pathname: "/visualise-office",
                                        state: {office: office}
                                    }}
                                >
                                    Visualise
                                </Button>
                            </Col>
                        </Accordion.Collapse>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={office.office_id}>
                        <>
                            <hr/>
                            <EntryListItems office={office}/>

                        </>
                    </Accordion.Collapse>
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
                <tr key={entry.entry_id}>
                    <td>{entry.tag}</td>
                    <td>{entry.consumption}</td>
                    <td>{entry.source}</td>
                    <td>{entry.further_info}</td>
                </tr>
            );
            return (
                <Table hover borderless responsive>
                    <thead>
                    <tr>
                        <th>Entry</th>
                        <th>Consumption (kgCO2e)</th>
                        <th>Source</th>
                        <th>Further Information</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mappedEntries}
                    </tbody>
                </Table>
            )
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
                                    backgroundColor: "#ccf9ce",
                                    borderColor: "#ccf9ce",
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
                        <Accordion style={{width: '100%'}}>
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
                overflowY: 'scroll',
                padding: 0,
                backgroundColor: COLORS.background,
            }}>
            <Body/>
        </Container>
    )
}