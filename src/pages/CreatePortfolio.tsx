import React, {useState} from 'react';
import {Button, Container, Form, Row} from 'react-bootstrap';
import {COLORS} from '../colors';
import '../App.css';
import {useHistory} from 'react-router-dom';
import axios from "axios";
import {ApiEndPoints} from "../ApiEndpoints";
import {v4 as uuidv4} from 'uuid';
import {AlertInfo, AlertViewer} from "./Alerts";
import {useAuthStore} from "../App";

const portfolio_id = uuidv4();
const office_id = uuidv4();
const region_id = uuidv4();


export default function CreatePortfolio() {
    const [alerts, setAlerts] = useState<AlertInfo[]>([]);

    const [portfolioTag, setPortfolioTag] = useState<string>("");
    const [officeTag, setOfficeTag] = useState<string>("");
    const [regionTag, setRegionTag] = useState<string>("");
    const [displayCreateOfficeButton, setDisplayCreateOfficeButton] = useState<boolean>(false);
    const [displayCreateOfficeForm, setDisplayCreateOfficeForm] = useState<boolean>(false);
    const [displayCreateRegionButton, setDisplayCreateRegionButton] = useState<boolean>(false);
    const [displayCreateRegionForm, setDisplayCreateRegionForm] = useState<boolean>(false);

    const user = useAuthStore(state => state.user);

    let history = useHistory()
    

    function AddRegionButton(props: { visible: boolean }): JSX.Element | null {
        if (props.visible) {
            return (
                <Button
                    className="Button"
                    onClick={() => setDisplayCreateRegionForm(true)}
                    style={{
                        color: COLORS.darkText,
                        backgroundColor: COLORS.secondaryAccent,
                        borderColor: COLORS.secondaryAccent,
                        marginTop: "1em",
                    }}
                >
                    Add region
                </Button>
            )
        } else {
            return null
        }
    }

    function AddOfficeButton(props: { visible: boolean }): JSX.Element | null {
        if (props.visible) {
            return (
                <Button
                    className="Button"
                    onClick={() => setDisplayCreateOfficeForm(true)}
                    style={{
                        color: COLORS.darkText,
                        backgroundColor: COLORS.secondaryAccent,
                        borderColor: COLORS.secondaryAccent,
                        marginTop: "1em",
                    }}
                >
                    Add office
                </Button>
            )
        } else {
            return null
        }
    }

    function AddPortfolio(props: { visible: boolean }): JSX.Element | null {
        async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
            event.preventDefault();
            setDisplayCreateRegionButton(true);
            const timestamp = new Date();

            axios.post(
                ApiEndPoints.createPortfolio + user?.uid,
                {
                    portfolio_id: portfolio_id,
                    user_id: user?.uid,
                    tag: portfolioTag,
                    numRegions: 0,
                    regions: [],
                    created_on: timestamp.toDateString(),
                    updated_on: timestamp.toDateString(),
                })
                .then(response => {
                    const successAlert: AlertInfo = {variant: "success", text: `Portfolio ${portfolioTag} created`};
                    setAlerts(oldAlerts => [...oldAlerts, successAlert]);
                    console.log(response);
                })
                .catch(error => {
                    const errorAlert: AlertInfo = {variant: "danger", text: error.toString()};
                    setAlerts(oldAlerts => [...oldAlerts, errorAlert]);
                    console.log(error);
                })
        }

        if (props.visible) {
            return (
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group
                            controlId="portfolioCreate"
                            style={{
                                margin: "auto",
                                marginBottom: "1em",
                            }}
                        >
                            <Form.Label>Portfolio Name</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                placeholder="Enter portfolio name"
                                value={portfolioTag}
                                onChange={event => setPortfolioTag(event.target.value)}
                            />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <Button
                        className="Button"
                        type="submit"
                        style={{
                            color: COLORS.darkText,
                            backgroundColor: COLORS.secondaryAccent,
                            borderColor: COLORS.secondaryAccent,
                            marginTop: "1em",
                        }}
                    >
                        Create
                    </Button>
                </Form>
            )
        } else {
            return null
        }
    }

    function AddRegionForm(props: { visible: boolean }): JSX.Element | null {
        async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
            event.preventDefault();
            setDisplayCreateOfficeButton(true);
            setDisplayCreateRegionButton(false);
            setDisplayCreateRegionForm(false);
            axios.post(
                ApiEndPoints.createRegion + user?.uid + '/' + portfolio_id + '/' + user?.uid,
                {
                    "name": regionTag,
                    "region_id": region_id,
                    "portfolio_id": portfolio_id,
                    "user_id": user?.uid,
                    "offices": []
                })
                .then(response => {
                    const successAlert: AlertInfo = {
                        variant: "success",
                        text: `Region ${regionTag} added to portfolio ${portfolioTag}`
                    };
                    setAlerts(oldAlerts => [...oldAlerts, successAlert]);
                    console.log(response);
                })
                .catch(error => {
                    const errorAlert: AlertInfo = {variant: "danger", text: error.toString()};
                    setAlerts(oldAlerts => [...oldAlerts, errorAlert]);
                    console.log(error);
                })
        }

        if (props.visible) {
            return (
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group
                            controlId="portfolioCreate"
                            style={{
                                margin: "auto",
                                marginBottom: "1em",
                            }}
                        >
                            <Form.Label>Create new region</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                placeholder="Enter region name"
                                value={regionTag}
                                onChange={event => setRegionTag(event.target.value)}
                            />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <Button
                        className="Button"
                        type="submit"
                        style={{
                            color: COLORS.darkText,
                            backgroundColor: COLORS.secondaryAccent,
                            borderColor: COLORS.secondaryAccent,
                            marginTop: "1em",
                        }}
                    >
                        Create
                    </Button>
                </Form>
            )
        } else {
            return null
        }
    }

    function AddOfficeForm(props: { visible: boolean }): JSX.Element | null {
        async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
            event.preventDefault();
            axios.post(
                ApiEndPoints.createOffice + region_id + '/' + portfolio_id + '/' + user?.uid,
                {
                    region_id: region_id,
                    portfolio_id: portfolio_id,
                    account_id: user?.uid,
                    office_id: office_id,
                    user_id: user?.uid,
                    name: officeTag,
                })
                .then(response => {
                    const successAlert: AlertInfo = {
                        variant: "success",
                        text: `Office ${officeTag} added to region ${regionTag}`
                    };
                    setAlerts(oldAlerts => [...oldAlerts, successAlert]);
                    history.push("/portfolios");
                    console.log(response);

                
                })
                .catch(error => {
                    //get existing region_id?
                    const errorAlert: AlertInfo = {variant: "danger", text: error.toString()};
                    setAlerts(oldAlerts => [...oldAlerts, errorAlert]);
                    console.log(error);
                })
        }

        if (props.visible) {
            return (
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group
                            controlId="portfolioCreate"
                            style={{
                                margin: "auto",
                                marginBottom: "1em",
                            }}
                        >
                            <Form.Label>Office Name</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                placeholder="Enter office name"
                                value={officeTag}
                                onChange={event => setOfficeTag(event.target.value)}
                            />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <Button
                        className="Button"
                        type="submit"
                        style={{
                            color: COLORS.darkText,
                            backgroundColor: COLORS.secondaryAccent,
                            borderColor: COLORS.secondaryAccent,
                            marginTop: "1em",
                        }}
                    >
                        Create
                    </Button>
                </Form>
            )
        } else {
            return null
        }
    }

    

    return (
        <Container
            fluid
            className="Landing"
            style={{
                padding: 0,
                backgroundColor: COLORS.accent,
            }}>
            <Container>
                <AlertViewer alerts={alerts}/>
                <Row>
                    <h1 className="bigText"
                        style={{
                            color: COLORS.darkText,
                        }}
                    >
                        Create Portfolio
                    </h1>
                </Row>
                <AddPortfolio visible={!displayCreateRegionButton && !displayCreateOfficeButton}/>
                <AddRegionButton visible={displayCreateRegionButton && !displayCreateRegionForm}/>
                <AddRegionForm visible={displayCreateRegionForm}/>
                <AddOfficeButton visible={displayCreateOfficeButton && !displayCreateOfficeForm}/>
                <AddOfficeForm visible={displayCreateOfficeForm}/>
            </Container>
        </Container>
    )
}