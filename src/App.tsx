import React from 'react';
import './App.css';
import {COLORS} from './colors';
import{Route, Switch, BrowserRouter as Router} from 'react-router-dom';


import Header from './Pages/Header';
import Landing from './Pages/Landing';
import About from './Pages/About'



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

        </Switch>

        
      </div>
    </Router>
  );
}

export default App;

