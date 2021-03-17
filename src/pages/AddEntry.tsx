import React, {useState} from 'react';
import Select from 'react-select'
import {COLORS} from '../colors';
import '../App.css';
import axios from 'axios'
import {ApiEndPoints} from "../ApiEndpoints";
import {Button, Form, Modal, Tabs, Tab} from 'react-bootstrap'
import {v4 as uuidv4} from 'uuid';
import {AlertInfo, AlertViewer} from "./Alerts";


export default function AddEntry(
    props: {
        accountID: string,
        portfolioID: string,
        regionID: string,
        officeID: string,
        officeTag: string,
        setAlerts: React.Dispatch<React.SetStateAction<AlertInfo[]>>,
        onSuccess: () => any,
    }) {


    const [entryID, setEntryID] = useState(uuidv4());

    const [show, setShow] = useState(false);
    const [entryTag, setEntryTag] = useState<string>("");
    const [consumption, setConsumption] = useState<number>(0);
    const [info, setInfo] = useState<string>("");
    const [alerts, setAlerts] = useState<AlertInfo[]>([]);
    const [key, setKey] = useState<string | null>("dbInput");

    const [scopes, setScopes] = useState([]);
    const [selectedScope, setSelectedScope] = useState<string>("");
    const [level1, setLevel1] = useState([]);
    const [selectedLevel1, setSelectedLevel1] = useState<string>("");
    const [level2, setLevel2] = useState([]);
    const [selectedLevel2, setSelectedLevel2] = useState<string>("");
    const [level3, setLevel3] = useState([]);
    const [selectedLevel3, setSelectedLevel3] = useState<string>("");
    const [level4, setLevel4] = useState([]);
    const [selectedLevel4, setSelectedLevel4] = useState<string>("");
    const [level5, setLevel5] = useState([]);
    const [selectedLevel5, setSelectedLevel5] = useState<string>("");

    const levelStrings = ["scope", "level1", "level2", "level3", "level4", "level5"];
    const levels = [scopes, level1, level2, level3, level4, level5];
    const levelSetters = [setScopes, setLevel1, setLevel2, setLevel3, setLevel4, setLevel5];
    const selectedLevels = [selectedScope, selectedLevel1, selectedLevel2, selectedLevel3, selectedLevel4, selectedLevel5];
    const selectedLevelSetters = [setSelectedScope, setSelectedLevel1, setSelectedLevel2, setSelectedLevel3, setSelectedLevel4, setSelectedLevel5];

    const [itemId, setItemId] = useState(0);
    const [units, setUnits] = useState<string>("");
    const [source, setSource] = useState<string>("");

    const [quantity, setQuantity] = useState<number>(0);

    async function getScopes() {
        axios.get(ApiEndPoints.getScopes)
            .then((response) => {
                console.log(response.data.message);
                setScopes(response.data.message);
            })
            .catch((error) => {
                const errorAlert: AlertInfo = {variant: "danger", text: error.toString()};
                setAlerts(oldAlerts => [...oldAlerts, errorAlert]);
                console.log(error);
            });
    }

    async function getSubcategories(levelIndex: number, selected: string) {
        let data: { [level: string]: string } = {};
        for (let i = 0; i < levelIndex; i++) {
            data[levelStrings[i]] = selectedLevels[i];
        }
        data[levelStrings[levelIndex]] = selected;

        axios.post(ApiEndPoints.getScopes, data)
            .then((response) => {
                if (response.data.subcategories) {
                    const subcategories = response.data.subcategories;
                    console.log("getSubcategories:", subcategories);
                    if (subcategories[0]) {
                        for (let i = levelIndex + 1; i <= 5; i++) {
                            selectedLevelSetters[i]("");
                            levelSetters[i]([]);
                        }
                        levelSetters[levelIndex + 1](subcategories);
                        setItemId(0);
                        setSource("");
                        setUnits("");
                    } else {
                        setItemId(response.data.id);
                        getItemInfo(response.data.id, quantity);
                    }
                } else {
                    let errorAlert: AlertInfo = {
                        variant: "danger",
                        text: response.data.message ? response.data.message : "No subcategories returned"
                    };
                    setAlerts(oldAlerts => [...oldAlerts, errorAlert]);
                    console.log(response);
                }
            })
            .catch((error) => {
                const errorAlert: AlertInfo = {variant: "danger", text: error.toString()};
                setAlerts(oldAlerts => [...oldAlerts, errorAlert]);
                console.log(error);
            });
    }

    async function getItemInfo(id: number, quantity: number) {
        axios.post(ApiEndPoints.getItemInfo, {
            id: id,
            amount: quantity
        })
            .then((response) => {
                console.log("getItemInfo:", response)
                if (response.data.total !== undefined) {
                    setUnits(response.data.calc_unit);
                    setSource(response.data.source);
                    setConsumption(response.data.total);
                } else {
                    let errorAlert: AlertInfo = {
                        variant: "danger",
                        text: response.data.message ? response.data.message : "No entries returned"
                    };
                    setAlerts(oldAlerts => [...oldAlerts, errorAlert]);
                    console.log(response.data.message);
                }
            })
            .catch((error) => {
                const errorAlert: AlertInfo = {variant: "danger", text: error.toString()};
                setAlerts(oldAlerts => [...oldAlerts, errorAlert]);
                console.log(error);
            });
    }

    function submitHandlerBuilder(isCustom: boolean) {
        return async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
            setEntryID(uuidv4());
            event.preventDefault();
            const URL = ApiEndPoints.createEntry +
                props.accountID +
                "/" + props.portfolioID +
                "/" + props.regionID +
                "/" + props.officeID;
            console.log(URL);
            axios.post(URL, {
                    entry_id: entryID,
                    office_id: props.officeID,
                    tag: entryTag,
                    consumption: consumption,
                    original: isCustom ? 0 : quantity,
                    converted: 0,
                    source: isCustom ? "Custom" : source,
                    units: isCustom ? "" : units,
                    level1: isCustom ? "" : selectedLevel1,
                    level2: isCustom ? "" : selectedLevel2,
                    level3: isCustom ? "" : selectedLevel3,
                    level4: isCustom ? "" : selectedLevel4,
                    further_info: info,
                    percentage: 1.0,
                    components: [],
                }
            )
                .then(function (response) {
                    const successAlert: AlertInfo = {variant: "success", text: `${entryTag} added to office`}
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
    }

    type SelectedOption = { label: string, value: string }

    function selectionHandler(levelIndex: number) {
        return (selected: SelectedOption | null) => {
            if (selected) {
                selectedLevelSetters[levelIndex](selected.value)
                getSubcategories(levelIndex, selected.value);
            }
        };
    }

    function formatOptions(options: string[]) {
        let formatted: { value: string, label: string }[] = []
        for (const option of options) {
            formatted = [...formatted, {value: option, label: option}];
        }
        return formatted;
    }

    function LevelSelector(props: {levelIndex: number}) {
        let value:string = "";
        if (selectedLevels[props.levelIndex]){
            value = selectedLevels[props.levelIndex];
        }
        if (props.levelIndex === 0 || levels[props.levelIndex].length > 0) {
            return <>
                <Form.Label>{props.levelIndex === 0 ? "Scope" : "Level " + props.levelIndex.toString()}</Form.Label>
                <Select
                    defaultValue={{ label: value, value: value }}
                    options={formatOptions(levels[props.levelIndex])}
                    onChange={selectionHandler(props.levelIndex)}
                />
                <br/>
            </>
        } else {
            return <></>
        }
    }

    function updateQuantity(newQuantity: number) {
        setQuantity(newQuantity);
        if (itemId) {
            getItemInfo(itemId, newQuantity);
        }
    }

    function handleClose() {
        setShow(false);
        // TODO: Reset all useStates
    }

    function handleShow() {
        getScopes();
        setShow(true);
    }

    function handleClear(){
        levelSetters.forEach((element, index) => {
            if (index < 1) return;
            element([]);
        });
        selectedLevelSetters.forEach(element => element(""));
        setConsumption(0);
        setEntryTag("");
        setQuantity(0);
        updateQuantity(0);
        setUnits("");
        setItemId(0);
        setSource("");
        setInfo("");
        console.log("Cleared form state");
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
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AlertViewer alerts={alerts} setAlerts={setAlerts}/>
                    <Tabs
                        id="controlled-tab"
                        activeKey={key}
                        onSelect={(k) => {
                            setKey(k);
                        }}
                        variant="pills"
                    >
                        <Tab eventKey="dbInput" title="Database Lookup">
                            <br/>
                            <Form id="create-entry-form" onSubmit={submitHandlerBuilder(false)}>
                                <Form.Row>
                                    <Form.Group
                                        controlId="entryCreate"
                                        style={{
                                            width: "100%",
                                            margin: "1em",
                                            marginTop: 0,
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

                                        <br/>
                                        <LevelSelector levelIndex={0}/>
                                        <LevelSelector levelIndex={1}/>
                                        <LevelSelector levelIndex={2}/>
                                        <LevelSelector levelIndex={3}/>
                                        <LevelSelector levelIndex={4}/>
                                        <LevelSelector levelIndex={5}/>

                                        <Form.Label>Source</Form.Label>
                                        <Form.Control
                                            type="string"
                                            placeholder={source}
                                            readOnly
                                        />
                                        <br/>

                                        <Form.Label>Quantity{units ? ` (${units})` : ""}</Form.Label>
                                        <Form.Control
                                            type="number"
                                            step="any"
                                            placeholder=""
                                            onChange={event => updateQuantity(Number(event.target.value))}
                                            required
                                        />
                                        <br/>

                                        <Form.Label>Consumption (kgCO2e)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder={consumption.toString()}
                                            readOnly
                                        />
                                        <br/>
                                        <Button className="float-right" variant="light" onClick={handleClear}>
                                            Clear
                                        </Button>

                                        <br/>
                                        <Form.Label>Further Info</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            value={info}
                                            onChange={event => setInfo(event.target.value)}
                                        />
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                        </Tab>
                        <Tab eventKey="manualInput" title="Custom Entry">
                            <br/>
                            <Form id="create-entry-form" onSubmit={submitHandlerBuilder(true)}>
                                <Form.Row>
                                    <Form.Group
                                        controlId="entryCreate"
                                        style={{
                                            width: "100%",
                                            margin: "1em",
                                            marginTop: 0,
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

                                        <br/>
                                        <Form.Label>Source</Form.Label>
                                        <Form.Control
                                            type="string"
                                            placeholder="Custom"
                                            readOnly
                                        />

                                        <br/>
                                        <Form.Label>Consumption (kgCO2e)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            step="any"
                                            placeholder=""
                                            onChange={event => setConsumption(Number(event.target.value))}
                                            required
                                        />

                                        <br/>
                                        <Form.Label>Further Info</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            value={info}
                                            onChange={event => setInfo(event.target.value)}
                                        />
                                        <br />
                                        <Button className="float-right" variant="light" onClick={handleClear}>
                                            Clear
                                        </Button>
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                        </Tab>
                    </Tabs>
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