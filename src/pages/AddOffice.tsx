import React, {useState} from 'react';
import {COLORS} from '../colors';
import '../App.css';
import './Portfolio.css';
import axios from 'axios';
import {ApiEndPoints} from "../ApiEndpoints";
import {v4 as uuidv4} from 'uuid';
import {Button, Form, Modal} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';


const office_id = uuidv4();

export default function AddOffice(
    props: { accountID: string, portfolioID: string, regionID: string,}
) {

    const [show, setShow] = useState(false);
   
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [officeTag, setOfficeTag] = useState<string>("");


    
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const URL = ApiEndPoints.createOffice + props.regionID + "/" + props.portfolioID + "/" + props.accountID;
        axios.post(URL,
            {
                office_id: office_id,
                user_id: props.accountID,
                region_id: props.regionID,
                name: officeTag,
                num_entries: 0,
                entries: []
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
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
                    backgroundColor: COLORS.highlight,
                    borderColor: COLORS.highlight,
                    float: "right",
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
                                    placeholder="office name"
                                    value={officeTag}
                                    onChange={event => setOfficeTag(event.target.value)}
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