import React, { useState } from 'react';
import './App.css';
import {COLORS} from './colors';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { FirebaseProvider } from "./FirebaseContext";
import HeaderLoggedOut from './Pages/HeaderLoggedOut';
import HeaderLoggedIn from './Pages/HeaderLoggedIn';
import Landing from './Pages/Landing';
import About from './Pages/About'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import CreatePortfolio from './Pages/CreatePortfolio';
import Account from './Pages/Account';


export const AuthContext = React.createContext({
    isLoggedIn: false,
    setLoggedIn: function setLoggedIn(params:boolean) {
        this.isLoggedIn = params;
    }
});


function App() {
    
    
    const [isLoggedIn, setLoggedIn] = useState(false);

    
    return (
        <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
            <FirebaseProvider>
                <Router>
                    <div className="App" style={{
                        color: COLORS.darkText,
                        backgroundColor: "white",
                    }}>

                        {isLoggedIn ?
                            <HeaderLoggedIn logoText="CA3" />
                            :
                            <HeaderLoggedOut logoText="CA3" />
                        }

                        <Switch>
                            <Route path="/" exact component={Landing}/>
                            <Route path="/about" exact component={About}/>
                            <Route path="/login"   exact component={Login}/>
                            <Route path="/signup" exact component={Signup}/>
                            <Route path="/create-portfolio" exact component={CreatePortfolio}/>
                            <Route path="/account" exact component={Account}/>
                        </Switch>


                    </div>
                </Router>
            </FirebaseProvider>
        </AuthContext.Provider>
    );
}

export default App;
