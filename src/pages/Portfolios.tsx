import React, {useEffect, useState} from 'react';
import {COLORS} from '../colors';
import '../App.css';
import {Link} from 'react-router-dom';
import axios from "axios";
import {ApiEndPoints} from '../ApiEndpoints';
import {Badge, Button, Col, Container, ListGroup, Row} from 'react-bootstrap'
import {useAuthStore} from "../App";
import firebase from "firebase";
import {AlertInfo, AlertViewer} from "./Alerts";
import './Portfolios.css';
import Pluralize from 'pluralize';
import {Portfolio} from "../Interfaces";

export default function Portfolios() {
    const user = useAuthStore(state => state.user) as firebase.User;
    const [alerts, setAlerts] = useState<AlertInfo[]>([]);
    const [portfolios, setPortfolios] = useState([]);
    const [portfoliosRetrieved, setPortfoliosRetrieved] = useState<boolean>(false);
    const [hasWaitedForAPI, setHasWaitedForAPI] = useState<boolean>(false);

    const getAllByTagURL = ApiEndPoints.getAllPortfolios + user?.uid

    useEffect(() => {
        setTimeout(() => setHasWaitedForAPI(true), 2000);
        axios.get(getAllByTagURL)
            .then(response => {
                const data = response.data;
                console.log(data);
                setPortfolios(data.payload)
                setPortfoliosRetrieved(true);
            })
            .catch((error => {
                const errorAlert: AlertInfo = {variant: "danger", text: error.toString()}
                setAlerts(oldAlerts => [...oldAlerts, errorAlert]);
                console.log(error);
            }));
    }, [getAllByTagURL])

    function PortfolioListItems(props: { portfolios: Portfolio[] }) {
        const portfolios = props.portfolios;

        if (portfolios.length !== 0) {
            return <>{
                portfolios.map((portfolio: Portfolio) => (
                        <ListGroup
                            key={portfolio.portfolio_id}
                            className="mb-1"
                            style={{padding: 5, width: '100%'}}
                        >
                            <ListGroup.Item
                                style={{
                                    color: COLORS.darkText,
                                    backgroundColor: "#F7F7F7",
                                    borderColor: "#F7F7F7"
                                }}
                                as={Link} to={"portfolio/" + portfolio.tag}>
                                <Row>
                                    <Col
                                        style={{
                                            textAlign: 'left',
                                            color: COLORS.darkText,
                                        }}
                                    >
                                        <h5>
                                            {portfolio.tag}
                                        </h5>
                                    </Col>
                                    <Col style={{textAlign: 'right'}}>
                                        <h5>
                                            <Badge
                                                style={{
                                                    color: COLORS.darkText,
                                                    fontWeight: "normal",
                                                    borderStyle: "solid",
                                                    borderWidth: 1,
                                                }}
                                            >
                                                {Pluralize("Region", portfolio.num_regions, true)}
                                            </Badge>

                                        </h5>        
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    )
                )
            }</>
        } else {
            return (
                <Col>
                    <h4
                        style={{
                            color: COLORS.darkText,
                            textAlign: "left",
                        }}
                    >
                        There are no portfolios on this account, <br/>
                        you can set one up by clicking the Create Portfolio button.
                    </h4>
                </Col>
            )
        }
    }

    function Body() {
        if (portfoliosRetrieved) {
            return (
                <Container>
                    <AlertViewer alerts={alerts} setAlerts={setAlerts}/>
                    <Row style={{paddingTop: 10, paddingBottom: 10}}>
                        <Col>
                            <h1 className="TitleText"
                                style={{
                                    color: COLORS.darkText,
                                    textAlign: "left",
                                }}
                            >
                                Your Portfolios
                            </h1>
                        </Col>
                        <Col xs="auto">
                            <Button
                                className="Button mr-1 mt-1"
                                style={{
                                    color: COLORS.darkText,
                                    backgroundColor: "#e5e4df",
                                    borderColor: "#e5e4df",
                                }}
                                as={Link} to="/create-portfolio"
                            >
                                Create Portfolio
                            </Button>
                            <Button
                                className="Button mr-1 mt-1"
                                style={{
                                    color: COLORS.darkText,
                                    backgroundColor: COLORS.visualiseGreen,
                                    borderColor: COLORS.visualiseGreen,
                                    float: 'right',
                                }}
                                as={Link}
                                to={{
                                    pathname: "/visualise",
                                    state: {data: {name: user.email, portfolios: portfolios}}//
                                }}
                            >
                                Visualise
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <ListGroup style={{
                            padding: 5,
                            width: '100%'
                        }}
                        >
                            <PortfolioListItems portfolios={portfolios}/>
                            
                        </ListGroup>
                    </Row>
                </Container>
            )
        } else {
            if (hasWaitedForAPI) {
                return (
                    <>
                        <Col>
                            <h4
                                style={{
                                    color: COLORS.darkText,
                                    textAlign: "left",
                                }}
                            >
                                Loading... <br/>
                                If you have any portfolios they will appear soon.
                            </h4>
                        </Col>
                    </>
                )
            } else {
                return (
                    <>
                    </>
                )
            }
        }
    }

    return (
        <Container
            fluid
            className="Landing overflow-auto"
            style={{
                padding: 0,
                backgroundColor: COLORS.background,
            }}
        >
            <Body/>
            <br/>
        </Container>
    )
}