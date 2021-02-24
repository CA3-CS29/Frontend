import React, {useState} from 'react';
import {COLORS} from '../colors';
import '../App.css';
import './Portfolio.css';
import axios from 'axios';
import {ApiEndPoints} from "../ApiEndpoints";
import {v4 as uuidv4} from 'uuid';
import {Button, Form, Modal} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import {AlertInfo} from "./Alerts";


export default function AddOffice(
    props: {
        accountID: string,
        portfolioID: string,
        regionID: string,
        setAlerts: React.Dispatch<React.SetStateAction<AlertInfo[]>>,
        onSuccess: () => any,
    }) {
    const [officeID, setOfficeID] = useState(uuidv4());

    const [show, setShow] = useState(false);
    const [officeTag, setOfficeTag] = useState<string>("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        setOfficeID(uuidv4());
        event.preventDefault();
        const URL = ApiEndPoints.createOffice + props.regionID + "/" + props.portfolioID + "/" + props.accountID;
        axios.post(URL, {
            office_id: officeID,
            user_id: props.accountID,
            region_id: props.regionID,
            name: officeTag,
            num_entries: 0,
            entries: [],
        })
            .then(function (response) {
                const successAlert: AlertInfo = {variant: "success", text: `${officeTag} added to region`}
                props.setAlerts(oldAlerts => [...oldAlerts, successAlert]);
                console.log(response);
                props.onSuccess();
            })
            .catch(function (error) {
                const errorAlert: AlertInfo = {variant: "danger", text: error.toString()}
                props.setAlerts(oldAlerts => [...oldAlerts, errorAlert]);
                console.log(error);
            })
        handleClose()
    }

    return (
        <>
            <Button
                className="Button mr-1 mt-1"
                style={{
                    color: COLORS.darkText,
                    backgroundColor: "#e5e4df",
                    borderColor: "#e5e4df",
                }}
                onClick={handleShow}
            >
                Add Office
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Office</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="create-office-form" onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group
                                controlId="officeCreate"
                                style={{
                                    margin: "auto",
                                    marginBottom: "1em",
                                }}
                            >
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    autoFocus
                                    type="text"
                                    placeholder="Office name"
                                    value={officeTag}
                                    onChange={event => setOfficeTag(event.target.value)}
                                    required
                                />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button form="create-office-form" type="submit" variant="primary">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}