import React, { useContext } from 'react';
import { COLORS } from '../colors';
import '../App.css';
import './Portfolio.css';
import {  useHistory } from 'react-router-dom';
import { FirebaseContext, IFirebaseContext } from '../FirebaseContext';
import { Container, Row } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';

export default function VisualiseOffice(props: {location: { state: { data: any; region: any; regionID: any; portfolioID: any; portfolioTag: any; }; };}) {
    let history = useHistory();
    const firebaseContext: IFirebaseContext = useContext(FirebaseContext);


    firebaseContext.firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            history.push("/");
        }
    });
   
    const data = props.location.state;
    const portfolioTag = data.data.portfolioTag;
    // const region = data.data.region;
    // const regionID = data.data.regionID;
    // const portfolioID = data.data.portfolioID;
    // const office = data.data.office;
    // const officeID = data.data.office_id;

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
                        <div>
                            <h1 className="MediumText"
                                style={{
                                    color: COLORS.darkText,
                                    textAlign: "left",
                                }}>
                                Portfolio: {portfolioTag}
                            </h1>
                        </div>
                    
                </Row>
                
            </Container>
        </Container>
    );
}