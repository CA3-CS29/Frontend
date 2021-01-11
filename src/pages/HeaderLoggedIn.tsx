import React, { useContext} from 'react';
import '../App.css';
import { COLORS } from '../colors';
import './Header.css'
import { FirebaseContext, IFirebaseContext } from "../FirebaseContext";
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

interface HeaderProps {
    logoText: string;
      
}

function ButtonsLoggedIn(){
    const firebaseContext: IFirebaseContext = useContext(FirebaseContext);
    const Auth = useContext(AuthContext);

    return(
        <div>
            

            <Button className="Button mr-1"
                style={{
                    color: COLORS.darkText,
                    backgroundColor: COLORS.highlight,
                    borderColor: COLORS.highlight,

                }}

                as={Link} to="/create-portfolio"
            >
                Create Portfolio
            </Button>

            <Button className="Button mr-1"
            style={{
                color: COLORS.darkText,
                backgroundColor: COLORS.highlight,
                borderColor: COLORS.highlight,
            }}

                as={Link} to="/account"
            >
                Account
            </Button>


            <Button className="Button mr-1"
                style={{
                    color: COLORS.darkText,
                    backgroundColor: COLORS.highlight,
                    borderColor: COLORS.highlight,

                }}
                onClick={() => {
                    firebaseContext.firebase.auth().signOut().then(function () {
                        Auth.setLoggedIn(false);
                        localStorage.setItem("isLoggedIn", JSON.stringify(false));
                        alert("Sign-out successful.")

                        // Sign-out successful.
                    }).catch(function (error) {
                        alert("Sign-out error.")
                        // An error happened.
                    });
                }}
            >
                Sign out
            </Button>
        </div>
    )
}


export default function HeaderLoggedIn(props: HeaderProps) {
          
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


            <ButtonToolbar>

                <ButtonsLoggedIn />

            </ButtonToolbar>


        </Navbar>
    )
    
}


