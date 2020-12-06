import React from 'react';
import '../App.css';
import { COLORS } from '../colors';
import './Header.css'

import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'


interface HeaderProps {
    logoText: string;
    //accountName: string;
}

export default function Header(props: HeaderProps) {

    return (
        <Navbar style={{
            backgroundColor: COLORS.primary,
            color: COLORS.lightText,
            fontFamily: 'Lato',
            height: 45,
        }}
            className="Header">
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
            <Button className="Button"
                style={{
                    color: COLORS.darkText,
                    backgroundColor: COLORS.highlight,
                    borderColor: COLORS.highlight,

                }}

                as={Link} to="/about"
            >
                About
                </Button>

            <Button className="Button"
                style={{
                    color: COLORS.darkText,
                    backgroundColor: COLORS.highlight,
                    borderColor: COLORS.highlight,

                }}

                as={Link} to="/create-portfolio"
            >
                Create Portfolio
                </Button>


        </Navbar>


    )
}


