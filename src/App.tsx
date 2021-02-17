import React, {useEffect, useState} from 'react';
import './App.css';
import {COLORS} from './colors';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';


import {FirebaseProvider} from "./FirebaseContext";
import HeaderLoggedOut from './pages/HeaderLoggedOut';
import HeaderLoggedIn from './pages/HeaderLoggedIn';
import Landing from './pages/Landing';
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CreatePortfolio from './pages/CreatePortfolio';
import CreateOffice from './pages/CreateOffice';
import Portfolios from './pages/Portfolios';
import Portfolio from './pages/Portfolio';
import VisualiseOffice from './pages/VisualiseOffice';
import Account from './pages/Account';

export const AuthContext = React.createContext({
    isLoggedIn: false,
    setLoggedIn: function setLoggedIn(params: boolean) {
        this.isLoggedIn = params;
        localStorage.setItem("isLoggedIn", JSON.stringify(params));
    }
});

function App() {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("isLoggedIn");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setLoggedIn(foundUser);
        }
        setAuthChecked(true);
    }, [])

    function Body() {
        if (authChecked) {
            if (isLoggedIn) {
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
                            <Route exact path="/create-office/" component={CreateOffice}/>
                            <Route exact path="/account" component={Account}/>
                            <Route exact path="/visualise-office" component={VisualiseOffice}/>
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
                            <Redirect exact from="/create-office" to="/"/>
                            <Redirect exact from="/account" to="/"/>
                            <Redirect exact from="/visualise-office" to="/"/>
                        </Switch>
                    </>
                )
            }
        } else {
            return <></>
        }
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, setLoggedIn}}>
            <FirebaseProvider>
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
            </FirebaseProvider>
        </AuthContext.Provider>
    );
}

export default App;
