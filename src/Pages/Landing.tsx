import React from 'react';
import { COLORS } from '../colors';
import './Landing.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button'


export default function Landing(){
    return(
        <div 
            className="Landing"
            style={{
                backgroundColor: COLORS.accent
            }}>

                <Button 
                style={{
                    color: COLORS.darkText,
                    backgroundColor: COLORS.highlight,
                    fontFamily: 'Lato',
                    fontWeight: 'lighter',
                    fontSize: 25,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "inline",
                    position: "absolute",
                    top: 400,
                    left: 200,
                }}
                as={Link} to="/login"
                >
                    Log in
                </Button>

                <Button 
                style={{
                    color: COLORS.darkText,
                    backgroundColor: COLORS.secondaryAccent,
                    fontFamily: 'Lato',
                    fontWeight: 'lighter',
                    fontSize: 25,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "inline",
                    position: "absolute",
                    top: 400,
                    left: 300,
                }}
                as={Link} to="/signup"
                >
                    Sign up
                </Button>

            <Container>
                <Row>
                    <h1 className="bigText"
                        style={{
                            color: COLORS.darkText,
                        }}>
                        Carbon Analysis 3
                    </h1>
                </Row>
                <Row>
                    <p  className="smallText"
                        style={{
                            color: COLORS.darkText,
                        }}>
                        Carbon emission calculations and visualisations made easy.
                    </p>
                </Row>
            </Container>
        
        </div>
    );
}