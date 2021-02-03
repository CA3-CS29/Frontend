import React, { useContext, useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { COLORS } from '../colors';
import '../App.css';
import { useHistory } from 'react-router-dom';
import { FirebaseContext, IFirebaseContext } from '../FirebaseContext';
import axios from "axios";
import {ApiEndPoints} from "../ApiEndpoints";
import { v4 as uuidv4 } from 'uuid';
const portfolio_id = uuidv4();
const office_id = uuidv4();
const region_id = uuidv4();


export default function CreatePortfolio() {
    const [portfolioTag, setPortfolioTag] = useState<string>("");
    const [officeTag, setOfficeTag] = useState<string>("");
    const [regionTag, setRegionTag] = useState<string>("");
    const [displayCreateOfficeButton, setDisplayCreateOfficeButton] = useState<boolean>(false);
    const [displayCreateOfficeForm, setDisplayCreateOfficeForm] = useState<boolean>(false);
    const [displayCreateRegionButton, setDisplayCreateRegionButton] = useState<boolean>(false);
    const [displayCreateRegionForm, setDisplayCreateRegionForm] = useState<boolean>(false);

    let history = useHistory();
    const firebaseContext: IFirebaseContext = useContext(FirebaseContext);

    firebaseContext.firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            history.push("/");
        }
    });


    interface RegionButtonProps {
        shouldRender: boolean
    }

    function AddRegionButton(props: RegionButtonProps): JSX.Element | null {

        if (props.shouldRender) {
            return (
                <Button className="Button"
                        onClick={() => setDisplayCreateRegionForm(true)}
                        style={{
                            color: COLORS.darkText,
                            backgroundColor: COLORS.secondaryAccent,
                            borderColor: COLORS.secondaryAccent,
                            marginTop: "1em",
                        }}>
                    Add region
                </Button>
            )
        } else {
            return null;
        }
    }

    interface OfficeButtonProps {
        shouldRender: boolean
    }

    function AddOfficeButton(props: OfficeButtonProps): JSX.Element | null {

        if (props.shouldRender) {
            return (
                <Button className="Button"
                        onClick={() => setDisplayCreateOfficeForm(true)}
                        style={{
                            color: COLORS.darkText,
                            backgroundColor: COLORS.secondaryAccent,
                            borderColor: COLORS.secondaryAccent,
                            marginTop: "1em",
                        }}>
                    Add office
                </Button>
            )
        } else {
            return null;
        }
    }



    interface AddPortfolioProps {
        visible: boolean
    }

    function AddPortfolio(props: AddPortfolioProps): JSX.Element | null {
        async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
            event.preventDefault();
            setDisplayCreateRegionButton(true);
            const timestamp = new Date();


            axios.post(ApiEndPoints.createPortfolio
                + firebaseContext.firebase.auth().currentUser?.uid,
                {
                    portfolio_id: portfolio_id,
                    user_id: [firebaseContext.firebase.auth().currentUser?.uid],
                    tag: portfolioTag,
                    regions: [],
                    created_on: timestamp.toDateString(),
                    updated_on: timestamp.toDateString(),
                })
                .then(function (response){
                    console.log(response);
                })
                .catch(function (error){
                    console.log(error);
                })

        }


        if (props.visible) {
            return (
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group controlId="portfolioCreate"
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

                    <Button className="Button"
                            type="submit"
                            style={{
                                color: COLORS.darkText,
                                backgroundColor: COLORS.secondaryAccent,
                                borderColor: COLORS.secondaryAccent,
                                marginTop: "1em",
                            }}>
                        Create
                    </Button>
                </Form>
            )
        } else {
            return null;
        }
    }

    interface CreateRegionFormProps {
        visible: boolean
    }

    function AddRegionForm(props: CreateRegionFormProps): JSX.Element | null {

        async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
            event.preventDefault();
            setDisplayCreateOfficeButton(true);
            setDisplayCreateRegionButton(false);
            setDisplayCreateRegionForm(false);
            axios.post(ApiEndPoints.createRegion
                + firebaseContext.firebase.auth().currentUser?.uid + '/'
                + portfolio_id + '/'
                + firebaseContext.firebase.auth().currentUser?.uid,
                {
                    "name":regionTag,
                    "region_id":region_id,
                    "portfolio_id":portfolio_id,
                    "user_id":[firebaseContext.firebase.auth().currentUser?.uid],
                    "offices":[]
                })
                .then(function (response){
                    console.log(response);
                })
                .catch(function (error){
                    console.log(error);
                })

        }


        if (props.visible) {
            return (
                <Form onSubmit={handleSubmit}>

                    <Form.Row>
                        <Form.Group controlId="portfolioCreate"
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

                    <Button className="Button"
                            type="submit"
                            style={{
                                color: COLORS.darkText,
                                backgroundColor: COLORS.secondaryAccent,
                                borderColor: COLORS.secondaryAccent,
                                marginTop: "1em",
                            }}>
                        Create
                    </Button>
                </Form>
            )
        } else {
            return null;
        }
    }

    interface CreateOfficeFormProps {
        visible: boolean
    }

    function AddOfficeForm(props: CreateOfficeFormProps): JSX.Element | null {

        async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
            event.preventDefault();
            axios.post(ApiEndPoints.createOffice
                + region_id + '/'
                + portfolio_id + '/'
                + firebaseContext.firebase.auth().currentUser?.uid,
                {
                    region_id: region_id,
                    portfolio_id: portfolio_id,
                    account_id: firebaseContext.firebase.auth().currentUser?.uid,
                    office_id: office_id,
                    user_id: [firebaseContext.firebase.auth().currentUser?.uid],
                    name: officeTag,
                })
                .then(function (response){
                    console.log(response);
                })
                .catch(function (error){
                    //get existing region_id?
                    console.log(error);
                })

        }

        if (props.visible) {
            return (
                <Form onSubmit={handleSubmit}>

                    <Form.Row>
                        <Form.Group controlId="portfolioCreate"
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

                    <Button className="Button"
                            type="submit"
                            style={{
                                color: COLORS.darkText,
                                backgroundColor: COLORS.secondaryAccent,
                                borderColor: COLORS.secondaryAccent,
                                marginTop: "1em",
                            }}>
                        Create
                    </Button>
                </Form>
            )
        } else {
            return null;
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
                <Row>
                    <h1 className="bigText"
                        style={{
                            color: COLORS.darkText,
                        }}>
                        Create Portfolio
                    </h1>
                </Row>
                <AddPortfolio visible={!displayCreateRegionButton && !displayCreateOfficeButton} />
                <AddRegionButton shouldRender={displayCreateRegionButton && !displayCreateRegionForm} />
                <AddRegionForm visible={displayCreateRegionForm} />
                <AddOfficeButton shouldRender={displayCreateOfficeButton && !displayCreateOfficeForm} />
                <AddOfficeForm visible={displayCreateOfficeForm} />
            </Container>
        </Container>
    );
}
