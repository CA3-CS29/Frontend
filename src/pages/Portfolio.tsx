import React, {useContext, useEffect, useState} from 'react';
import {COLORS} from '../colors';
import '../App.css';
import './Portfolio.css';
import {Link} from 'react-router-dom';
import axios from 'axios'
import {ApiEndPoints} from "../ApiEndpoints";
import {FirebaseContext, IFirebaseContext} from '../FirebaseContext';
import {Accordion, Button, Card, Col, Container, ListGroup, Row} from 'react-bootstrap'
import {AlertInfo, AlertViewer} from "./Alerts";

import 'bootstrap/dist/css/bootstrap.min.css';
import AddEntry from "./AddEntry";
import {AuthContext} from "../App";


export default function Portfolio(props: { match: { params: { tag: string } } }) {
    const firebaseContext: IFirebaseContext = useContext(FirebaseContext);
    const [userID, setUserID] = useState("");

    const Auth = useContext(AuthContext);

    firebaseContext.firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            Auth.setLoggedIn(false);
            localStorage.setItem("isLoggedIn", JSON.stringify(false));
        } else {
            setUserID(user.uid);
        }
    });

    interface Entry {
        entry_id: string,
        tag: string,
        consumption: number,
        source: string,
        info: string,
    }

    interface Office {
        name: string,
        office_id: string,
        entries: Entry[],
    }

    interface Region {
        region_id: string,
        portfolio_id: string,
        user_id: string,
        name: string,
        num_offices: number,
        offices: Office[],
    }

    const {tag} = props.match.params;
    const [status, setStatus] = useState("");
    const [portfolioId, setPortfolioId] = useState("");
    const [num_regions, setNum_regions] = useState(0);
    const [regions, setRegions] = useState([]);

    const [alerts, setAlerts] = useState<AlertInfo[]>([]);

    const getPortfolioURL = ApiEndPoints.getPortfolio
        + tag + "/" + firebaseContext.firebase.auth().currentUser?.uid;

    useEffect(() => {
        axios.get(getPortfolioURL)
            .then((response) => {
                const data = response.data;
                console.log("Got Data");
                console.log(getPortfolioURL);
                console.table(data);

                setStatus(data.status);
                setPortfolioId(data.payload.portfolio_id);
                setNum_regions(data.payload.num_regions);
                setRegions(data.payload.regions);
            })
            .catch((error) => {
                const errorAlert: AlertInfo = {variant: "danger", text: error.toString()}
                setAlerts(oldAlerts => [...oldAlerts, errorAlert]);
                console.log(error);
            });
    }, [getPortfolioURL])


    function RegionListItems(props: { regions: Region[]; }) {
        const regions = props.regions;

        const listOfRegions = regions.map((region) =>
            <Card key={region.region_id}>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    <Row>
                        <Col style={{textAlign: "left"}}>
                            <h4>{region.name}</h4>
                            {region.region_id}
                        </Col>
                        <Col>
                            <div>
                                <Button
                                    className="Button mr-1 mt-1"
                                    style={{
                                        color: COLORS.darkText,
                                        backgroundColor: COLORS.highlight,
                                        borderColor: COLORS.highlight,
                                        float: 'right',
                                    }}
                                    as={Link}
                                    to={{
                                        pathname: "/create-office",
                                        state: {
                                            data: {
                                                region: region.name,
                                                regionID: region.region_id,
                                                portfolioID: portfolioId,
                                                portfolioTag: tag,
                                            }
                                        }
                                    }}
                                >
                                    Add Office
                                </Button>
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
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body style={{padding: 5}}>

                        <OfficeListItems region={region}/>

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        )
        return <div>{listOfRegions}</div>
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
                                        state: {
                                            data: {
                                                region: region.name,
                                                regionID: region.region_id,
                                                portfolioID: portfolioId,
                                                portfolioTag: tag,
                                                office: office,
                                            }
                                        }
                                    }}
                                >
                                    Visualise
                                </Button>
                                <AddEntry
                                    accountID={userID}
                                    portfolioID={portfolioId}
                                    regionID={region.region_id}
                                    officeID={office.office_id}
                                    officeTag={office.name}
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

    return (
        <Container
            fluid
            className="Landing"
            style={{
                padding: 0,
                backgroundColor: COLORS.background,
            }}>
            <Container>
                <AlertViewer alerts={alerts}/>
                <Row style={{paddingTop: 10, paddingBottom: 10}}>
                    <Col>
                        <h1 className="MediumText" style={{color: COLORS.darkText, textAlign: "left"}}>
                            {tag}
                        </h1>
                    </Col>
                    <Col xs="auto">
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
                            Add Region
                        </Button>
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
                        Number of regions: {num_regions}<br/>
                    </Card>
                </Row>
                <Row>
                    <Accordion defaultActiveKey="0" style={{width: '100%'}}>
                        <RegionListItems regions={regions}/>
                    </Accordion>
                </Row>
            </Container>
        </Container>
    );


}