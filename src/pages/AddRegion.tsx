import React, { useState } from 'react';
import { COLORS } from '../colors';
import '../App.css';
import './Portfolio.css';
import axios from 'axios'
import { Button, Form, Modal } from 'react-bootstrap'
import { ApiEndPoints } from "../ApiEndpoints";
import { v4 as uuidv4 } from 'uuid';


const region_id = uuidv4();

export default function AddRegion(
    props: { accountID: string, portfolioID: string}
) {
    const [show, setShow] = useState(false);
    const [regionTag, setRegionTag] = useState<string>("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const URL = ApiEndPoints.createRegion + props.accountID + "/" + props.portfolioID + "/" + props.accountID;
        axios.post(URL, {
            "region_id": region_id,
            "portfolio_id": props.portfolioID,
            "user_id": props.accountID,
            "name": regionTag,
            "num_offices": 0,
            "offices": []
        }
        )
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
                Add Region
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Region</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="create-region-form" onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group
                                controlId="regionCreate"
                                style={{
                                    margin: "auto",
                                    marginBottom: "1em",
                                }}
                            >
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    autoFocus
                                    type="text"
                                    placeholder="Region name"
                                    value={regionTag}
                                    onChange={event => setRegionTag(event.target.value)}
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
                    <Button form="create-region-form" type="submit" variant="primary">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}