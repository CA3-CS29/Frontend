import React, {useState} from 'react';
import {COLORS} from '../colors';
import '../App.css';
import './Portfolio.css';
import {useHistory} from 'react-router-dom';
import axios from 'axios'
import {ApiEndPoints} from "../ApiEndpoints";
import {v4 as uuidv4} from 'uuid';
import {Button, Container, Form, Row} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import {useAuthStore} from "../App";
import firebase from "firebase";

const office_id = uuidv4();

export default function CreateOffice(props: { match: { params: { region: any; }; }, location: { state: { data: any; region: any; regionID: any; portfolioID: any; portfolioTag: any; }; }; }) {
    let history = useHistory();

    const [officeTag, setOfficeTag] = useState<string>("");

    const user = useAuthStore(state => state.user) as firebase.User;

    const data = props.location.state;
    const region = data.data.region;
    const regionID = data.data.regionID;
    const portfolioID = data.data.portfolioID;
    const portfolioTag = data.data.portfolioTag;

    function AddOffice() {
        async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
            event.preventDefault();

            const URL = ApiEndPoints.createOffice + regionID + "/" + portfolioID + "/" + user.uid;
            console.log(URL);
            axios.post(URL,
                {
                    office_id: office_id,
                    user_id: user.uid,
                    region_id: regionID,
                    name: officeTag,
                    num_entries: 0,
                    entries: []
                })
                .then(function (response) {
                    console.log(response);
                    history.push("/portfolio/" + portfolioTag);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

        return (
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group controlId="portfolioCreate"
                                style={{
                                    margin: "auto",
                                    marginBottom: "1em",
                                }}
                    >
                        <Form.Label/>
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
            <Container>
                <Row>
                    <div>
                        <h1 className="MediumText"
                            style={{
                                color: COLORS.darkText,
                                alignContent: "right",
                            }}
                        >
                            Adding office to the <b>{region}</b> region
                        </h1>
                        <AddOffice/>
                    </div>
                </Row>
            </Container>
        </Container>
    )
}