import React from 'react';
import '../App.css';
import {COLORS} from '../colors';
import './Header.css'
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'


function ButtonsLoggedOut() {
    return (
        <div>
            <Button
                className="Button mr-1"
                style={{
                    color: COLORS.darkText,
                    backgroundColor: COLORS.highlight,
                    borderColor: COLORS.highlight,
                }}
                as={Link} to="/about"
            >
                About
            </Button>
        </div>
    )
}

export default function HeaderLoggedOut(props: { logoText: string }) {
    return (
        <Navbar
            style={{
                backgroundColor: COLORS.primary,
                color: COLORS.lightText,
                fontFamily: 'Lato',
                height: 45,
            }}
            className="Header"
        >
            <Nav className="mr-auto">
                <Navbar.Brand
                    style={{
                        color: COLORS.lightText,
                        fontFamily: 'Lato',
                        fontWeight: 'lighter',
                        fontSize: 40,
                    }}
                    as={Link} to="/"
                >
                    {props.logoText}
                </Navbar.Brand>
            </Nav>
            <ButtonToolbar>

                <ButtonsLoggedOut/>

            </ButtonToolbar>
        </Navbar>
    )
}


