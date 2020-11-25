import React from 'react';
import './App.css';
import {COLORS} from './colors';
import{Route, Switch, BrowserRouter as Router} from 'react-router-dom';


import Header from './Pages/Header';
import Landing from './Pages/Landing';
import About from './Pages/About'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

function App() {
  return (
    <Router>
      <div className="App" style={{
        color: COLORS.darkText,
        backgroundColor: "white",
      }}>
      
        <Header logoText="CA3" />

        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/about" exact component={About} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
        </Switch>

        
      </div>
      <div>Login</div>
    </Router>
  );
}

export default App;

