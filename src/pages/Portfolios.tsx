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

export default function Portfolios() {
    const user = useAuthStore(state => state.user) as firebase.User;
    const [alerts, setAlerts] = useState<AlertInfo[]>([]);
    const [portfolios, setPortfolios] = useState([]);
    const [portfoliosRetrieved, setPortfoliosRetrieved] = useState<boolean>(false);

    const getAllByTagURL = ApiEndPoints.getAllPortfolios + user?.uid

    useEffect(() => {
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

    function PortfolioListItems(props: { portfolios: any }) {
        const portfolios = props.portfolios;

        if (portfolios.length !== 0) {
            return portfolios.map((portfolio: {
                    tag: string;
                    num_regions: number;
                    portfolio_id: string;
                }) => (
                    <ListGroup
                        key={portfolio.portfolio_id}
                        className="mb-1"
                        style={{
                            padding: 5,
                            width: '100%'
                        }}
                    >
                        <ListGroup.Item
                            style={{
                                color: COLORS.darkText,
                                backgroundColor: "#F7F7F7",
                                borderColor: "#F7F7F7"
                            }}
                            as={Link} to={"portfolio/" + portfolio.tag}>
                            <Row>
                                <Col style={{textAlign: 'left'}}>
                                    {portfolio.tag}
                                </Col>
                                <Col style={{textAlign: 'right'}}>
                                    <Badge
                                        style={{
                                            fontFamily: "Lato",
                                            color: COLORS.darkText,
                                            backgroundColor: COLORS.secondaryAccent,
                                        }}
                                    >
                                        {Pluralize("Region", portfolio.num_regions, true)}
                                    </Badge>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                )
            )
        } else {
            return (
                <Col>
                    <h4 className="MediumText" style={{color: COLORS.darkText, textAlign: "left"}}>
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
                    <AlertViewer alerts={alerts}/>
                    <Row style={{paddingTop: 10, paddingBottom: 10}}>
                        <Col>
                            <h1 className="MediumText" style={{color: COLORS.darkText, textAlign: "left"}}>
                                Your Portfolios
                            </h1>
                        </Col>
                        <Col xs="auto">
                            <Button
                                className="Button mr-1"
                                style={{
                                    color: COLORS.darkText,
                                    backgroundColor: COLORS.highlight,
                                    borderColor: COLORS.highlight,

                                }}
                                as={Link} to="/create-portfolio"
                            >
                                Create Portfolio
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
            }}
        >
            <Body/>
        </Container>
    )
}