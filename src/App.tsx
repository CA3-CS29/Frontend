import React, {useEffect, useState} from 'react';
import './App.css';
import {COLORS} from './colors';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import create from "zustand";
import HeaderLoggedOut from './pages/HeaderLoggedOut';
import HeaderLoggedIn from './pages/HeaderLoggedIn';
import Landing from './pages/Landing';
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CreatePortfolio from './pages/CreatePortfolio';
import Portfolios from './pages/Portfolios';
import Portfolio from './pages/Portfolio';
import Account from './pages/Account';
import firebase from "firebase";
import Visualise from "./pages/Visualise";


const firebaseConfig = {
    apiKey: "AIzaSyAxmxwscM4xp7aFYrSUvktm1-QRjZboAoY",
    authDomain: "ca3-frontend.firebaseapp.com",
    databaseURL: "https://ca3-frontend.firebaseio.com",
    projectId: "ca3-frontend",
    storageBucket: "ca3-frontend.appspot.com",
    messagingSenderId: "182285255213",
    appId: "1:182285255213:web:39d2868c5f88e0a445aea4",
}

if (firebase.apps.length === 0) {
    const firebaseApp = firebase.initializeApp(firebaseConfig);
    firebaseApp.auth().setPersistence(
        process.env.NODE_ENV === "test" ?
            firebase.auth.Auth.Persistence.NONE
            :
            firebase.auth.Auth.Persistence.LOCAL)
}

type AuthStore = {
    firebase: firebase.app.App,
    user: firebase.User | null,
}

export const useAuthStore = create<AuthStore>(set => ({
    firebase: firebase.app(),
    user: null,
}))

export default function App() {
    const user = useAuthStore(state => state.user);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        firebase.app().auth().onAuthStateChanged((user) => {
            useAuthStore.setState({user: user});
            setAuthChecked(true);
        })
    }, [])

    function Body() {
        if (authChecked) {
            if (user) {
                return (
                    <>
                        <HeaderLoggedIn logoText="CA3"/>
                        <Switch>
                            <Redirect exact from="/" to="/portfolios"/>
                            <Route exact path="/about" component={About}/>
                            <Redirect exact from="/login" to="/portfolios"/>
                            <Redirect exact from="/signup" to="/portfolios"/>
                            <Route exact path="/portfolios" component={Portfolios}/>
                            <Route exact path="/portfolio/:tag" component={Portfolio}/>
                            <Route exact path="/create-portfolio" component={CreatePortfolio}/>
                            <Route exact path="/account" component={Account}/>
                            <Route exact path="/visualise" component={Visualise}/>
                        </Switch>
                    </>
                )
            } else {
                return (
                    <>
                        <HeaderLoggedOut logoText="CA3"/>
                        <Switch>
                            <Route exact path="/" component={Landing}/>
                            <Route exact path="/about" component={About}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/signup" component={Signup}/>
                            <Redirect exact from="/portfolios" to="/"/>
                            <Redirect exact from="/portfolio/:tag" to="/"/>
                            <Redirect exact from="/create-portfolio" to="/"/>
                            <Redirect exact from="/account" to="/"/>
                            <Redirect exact from="/visualise" to="/"/>
                        </Switch>
                    </>
                )
            }
        } else {
            return <></>
        }
    }

    return (
        <Router>
            <div
                className="App"
                style={{
                    color: COLORS.darkText,
                    backgroundColor: "white",
                }}
            >
                <Body/>
            </div>
        </Router>
    )
}