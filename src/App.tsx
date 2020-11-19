import React from 'react';
import './App.css';
import {COLORS} from './colors';
import{Route, Switch, Link, BrowserRouter as Router} from 'react-router-dom';


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

        
        

        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    </Router>
  );
}

export default App;
