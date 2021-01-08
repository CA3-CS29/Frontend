import React, { useState } from 'react';
import './App.css';
import {COLORS} from './colors';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { FirebaseProvider } from "./FirebaseContext";
import HeaderLoggedOut from './pages/HeaderLoggedOut';
import HeaderLoggedIn from './pages/HeaderLoggedIn';
import Landing from './pages/Landing';
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CreatePortfolio from './pages/CreatePortfolio';
import Portfolios from './pages/Portfolios'
import Account from './pages/Account';


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
                            <Route path="/portfolios" exact component={Portfolios}/>
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
