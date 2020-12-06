import React, { useContext, useState } from 'react';
import { Button, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import { COLORS } from '../colors';
import './Responsive.css'
import '../App.css';
import { useHistory } from 'react-router-dom';
import { FirebaseContext, IFirebaseContext } from '../FirebaseContext';


export default function CreatePortfolio() {
    const [portfolioTag, setPortfolioTag] = useState<string>("");
    const [officeTag, setOfficeTag] = useState<string>("");
    const [selectedRegion, setSelectedRegion] = useState<string>("");
    const [displayCreateOfficeButton, setDisplayCreateOfficeButton] = useState<boolean>(false);
    const [displayCreateOfficeForm, setDisplayCreateOfficeForm] = useState<boolean>(false);
    let history = useHistory();
    const firebaseContext: IFirebaseContext = useContext(FirebaseContext);

    if (!firebaseContext.firebase.auth().currentUser) {
        history.push("/");
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
            return (null);
        }
    }

    interface AddPortfolioProps {
        visible: boolean
    }

    function AddPortfolio(props: AddPortfolioProps): JSX.Element | null {

        async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
            setDisplayCreateOfficeButton(true);
            // TODO: API call to create portfolio
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
            return (null);
        }
    }

    interface CreateOfficeFormProps {
        visible: boolean
    }

    function AddOfficeForm(props: CreateOfficeFormProps): JSX.Element | null {

        // TODO: fetch actual available regions from API
        let dropDownItems = [];
        const regionOptions = ["default", "emea", "na", "sa", "apac"];

        const onTargetSelect = (selected: string) => {
            setSelectedRegion(selected);
        }

        for (let i = 0; i < regionOptions.length; i++) {
            dropDownItems.push(<Dropdown.Item key={regionOptions[i]} eventKey={i.toString()} onSelect={() => onTargetSelect(regionOptions[i])}>{regionOptions[i]}</Dropdown.Item>)
        }

        function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
            // TODO: API call to create office
            const selectedRegionTag = selectedRegion;
            console.log(selectedRegionTag);
        }



        if (props.visible) {
            return (
                <Form onSubmit={handleSubmit}>

                    <DropdownButton
                        id="regionDropdownButton"
                        title="Select Region"
                        style={{
                            margin: "auto",
                            marginBottom: "1em",
                        }}>
                        {dropDownItems}
                    </DropdownButton>

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
            return (null);
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
            <Row className="responsiveRow">
                <Container>
                    <Row>
                        <h1 className="bigText"
                            style={{
                                color: COLORS.darkText,
                            }}>
                            Create Portfolio
                            </h1>
                    </Row>
                    <AddPortfolio visible={!displayCreateOfficeButton} />
                    <AddOfficeButton shouldRender={displayCreateOfficeButton && !displayCreateOfficeForm} />
                    <AddOfficeForm visible={displayCreateOfficeForm} />
                </Container>
            </Row>
        </Container>
    );
}