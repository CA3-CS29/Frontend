import React, { useContext, useEffect, useState } from 'react';
import { COLORS } from '../colors';
import '../App.css';
import './Portfolio.css';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import { ApiEndPoints } from "../ApiEndpoints";
import { FirebaseContext, IFirebaseContext } from '../FirebaseContext';
import { Container, Row, Col, Button, Accordion, Card } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';


export default function Portfolio(props: { match: { params: { tag: string; }; }; }) {
    let history = useHistory();
    const firebaseContext: IFirebaseContext = useContext(FirebaseContext);


    firebaseContext.firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            history.push("/");
        }
    });

    interface Office {
        name: string,
        office_id: string,
    };

    interface Region {
        region_id: string,
        portfolio_id: string,
        user_id: string,
        name: string,
        num_offices: number,
        offices: Office[],
    };

    const { tag } = props.match.params;
    // const [data, setData] = useState(Object);
    const [status, setStatus] = useState("");
    const [portfolioId, setPortfolioId] = useState("");
    const [num_regions, setNum_regions] = useState(0);
    const [regions, setRegions] = useState([{
        region_id: "",
        portfolio_id: "",
        user_id: "",
        name: "",
        num_offices: 0,
        offices: [{
            name: "",
            office_id: "",
        }],
    }]);

    const getPortfolioURL = ApiEndPoints.getPortfolio
        + tag + "/" + firebaseContext.firebase.auth().currentUser?.uid;


    useEffect(() => {
        axios.get(getPortfolioURL)
            .then((response) => {
                const data = response.data;
                // setData(data);
                console.log("Got Data");
                console.log(getPortfolioURL);
                console.table(data);

                setStatus(data.status);
                setPortfolioId(data.payload.portfolio_id);
                setNum_regions(data.payload.num_regions);
                setRegions(data.payload.regions)
                    ;

            })
            .catch((error) => {
                alert("Caught error")
                console.log(error);
            });
    }, [getPortfolioURL])

  

    function RegionListItems(props: { regions: Region[]; }) {
        const regions = props.regions;
        
        const listOfRegions = regions.map((region) =>
            <div>
                <Card >
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        <Row>
                            <Col>
                                <p style={{
                                    textAlign: "left",
                                }}>
                                    {region.name}<br></br>
                                    {region.region_id}<br></br>
                                </p>
                            </Col>
                            <Col>
                                <div >
                                    <Button className="Button mr-1 mt-1"
                                        style={{
                                            color: COLORS.darkText,
                                            backgroundColor: COLORS.highlight,
                                            borderColor: COLORS.highlight,
                                            float: 'right',

                                        }}

                                        as={Link} to={{
                                            pathname: "/create-office",
                                            state: {
                                                data: {
                                                    region: region.name,
                                                    regionID: region.region_id,
                                                    portfolioID: portfolioId,
                                                    portfolioTag: tag,
                                                }
                                            }
                                        }}
                                    >
                                        Add Office
                                    </Button>
                                    <Button className="Button mr-1 mt-1"
                                        style={{
                                            color: COLORS.darkText,
                                            backgroundColor: COLORS.highlight,
                                            borderColor: COLORS.highlight,
                                            float: 'right',

                                        }}
                                    >
                                        Visualise
                                        </Button>
                                </div>
                            </Col>
                        </Row>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>

                            <OfficeListItems region={region} />

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </div>
        )


        return (
            <div>{listOfRegions}</div>
        );
    }

    function OfficeListItems(props: { region: Region; }) {
        const offices = props.region.offices;
        const region = props.region;
        
        if(offices){

            const mappedOffices = offices.map((office) => 
                <div>
                    <Link to={{
                        pathname: "/visualise-office",
                        state: {
                            data: {
                                region: region.name,
                                regionID: region.region_id,
                                portfolioID: portfolioId,
                                portfolioTag: tag,
                                office: office,
                            }
                        }
                        }}
                    >
                    {office.name}
                    </Link><br></br>
                </div>
            
            )
            
            return (
                <div>{mappedOffices}</div>
            );
        }else{
            return(
                <div>

                    No office here just yet
                </div>
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
            }}>
            <Container>
                <Row>
                    <Col>
                        <div>
                            <h1 className="MediumText"
                                style={{
                                    color: COLORS.darkText,
                                    textAlign: "left",
                                }}>
                                Portfolio: {tag}
                            </h1>
                        </div>
                    </Col>

                    <Col>

                        <div>
                            <div >
                                <Button className="Button mr-1 mt-1"
                                    style={{
                                        color: COLORS.darkText,
                                        backgroundColor: COLORS.highlight,
                                        borderColor: COLORS.highlight,
                                        float: 'right',

                                    }}

                                // as={Link} to="/create-portfolio"
                                >
                                    Add Region
                                </Button>
                                <Button className="Button mr-1 mt-1"
                                    style={{
                                        color: COLORS.darkText,
                                        backgroundColor: COLORS.highlight,
                                        borderColor: COLORS.highlight,
                                        float: 'right',

                                    }}

                                // as={Link} to="/create-portfolio"
                                >
                                    Visualise
                                </Button>
                            </div>
                        </div>

                    </Col>
                </Row>
                <Row>
                   
                        <p style={{
                            borderRadius: '5px',
                            padding: '21px',
                            backgroundColor: COLORS.accent,
                            width: '100%',
                            textAlign:"left",

                        }}>
                            This is a paragraph about the portfolio<br></br>
                            {status}<br></br>
                            {portfolioId}<br></br>
                            {num_regions}<br></br>

                        </p>
                    
                </Row>

                <Row>

                    
                    <Accordion defaultActiveKey="0" style={{
                    width: '100%',
                    }}>

                        <RegionListItems regions={regions} />

                    </Accordion>

                </Row>
            </Container>
        </Container>
    );



}