import React, { Component } from 'react';
import './App.css';

import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Homepage } from './Homepage';
import { Congress } from './Congress';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div>
      {/* <nav className="navbar navbar-expand fixed-top">
        <div className="container">
          <a href="https://www.usa.gov/register-to-vote">
              <img className="nav-logo" src="data/votelogo.png" width="100" height="50" alt="I voted sticker logo that links to a voting registration site"></img>
          </a>
          <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link active" href="">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="./congress.js">Congress</a></li>
          </ul>
        </div>
      </nav> */}

      <Router>
        <div className="container">
          <Link to="/">Home</Link>
          { ' ' }
          <Link to="/congress">Congress</Link>
          { ' ' }
          <Route exact path="/" component={ Homepage } />
          <Route path="/congress" component={ Congress } />
        </div>
      </Router>
      <footer>
        <div className="container">
            <a href="https://www.usa.gov/register-to-vote" target='_blank'>
                <img className="footer-logo" src="data/votelogo.png" width="100" height="50" alt="I voted sticker logo that links to a voting registration site"></img>
            </a>
        </div>
      </footer>
      </div>
    );
  }
}

export default App;
