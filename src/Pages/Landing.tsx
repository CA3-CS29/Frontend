import React from 'react';
import { COLORS } from '../colors';
import './Landing.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'


export default function Landing(){
    return(
        <div 
            className="Landing"
            style={{
                backgroundColor: COLORS.accent
            }}>
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