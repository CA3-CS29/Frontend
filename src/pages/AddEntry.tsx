import React, {useState} from 'react';
import {COLORS} from '../colors';
import '../App.css';
import './Portfolio.css';
import axios from 'axios'
import {Button, Form, Modal} from 'react-bootstrap'
import {ApiEndPoints} from "../ApiEndpoints";
import {v4 as uuidv4} from 'uuid';
import {AlertInfo} from "./Alerts";


const entry_id = uuidv4();

export default function AddEntry(
    props: {
        accountID: string,
        portfolioID: string,
        regionID: string,
        officeID: string,
        officeTag: string,
        setAlerts: React.Dispatch<React.SetStateAction<AlertInfo[]>>
    }) {
    const [show, setShow] = useState(false);
    const [entryTag, setEntryTag] = useState<string>("");
    const [consumption, setConsumption] = useState<number>(0);
    const [info, setInfo] = useState<string>("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const URL = ApiEndPoints.createEntry +
            props.accountID +
            "/" + props.portfolioID +
            "/" + props.regionID +
            "/" + props.officeID;
        console.log(URL);
        axios.post(URL, {
                "entry_id": entry_id,
                "office_id": props.officeID,
                "tag": entryTag,
                "consumption": consumption,
                "original": 0,
                "converted": 0,
                "source": "custom",
                "units": "",
                "level1": "",
                "level2": "",
                "level3": "",
                "level4": "",
                "further_info": info,
                "percentage": 1.0,
                "components": [],
            }
        )
            .then(function (response) {
                const successAlert: AlertInfo = {variant: "success", text: `${entryTag} added to office`}
                props.setAlerts(oldAlerts => [...oldAlerts, successAlert]);
                console.log(response);
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
                className="Button mr-1"
                style={{
                    color: COLORS.darkText,
                    backgroundColor: "#e5e4df",
                    borderColor: "#e5e4df",
                }}
                onClick={handleShow}
            >
                Add Entry
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="create-entry-form" onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group
                                controlId="entryCreate"
                                style={{
                                    margin: "auto",
                                    marginBottom: "1em",
                                }}
                            >
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    autoFocus
                                    type="text"
                                    placeholder="Entry name"
                                    value={entryTag}
                                    onChange={event => setEntryTag(event.target.value)}
                                    required
                                />
                                <Form.Label>Consumption (kgCO2e)</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="any"
                                    placeholder=""
                                    onChange={event => setConsumption(Number(event.target.value))}
                                    required
                                />
                                <Form.Label>Further Info</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    value={info}
                                    onChange={event => setInfo(event.target.value)}
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
                    <Button form="create-entry-form" type="submit" variant="primary">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}