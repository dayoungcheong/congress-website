import React, { Component } from 'react';
import './App.css';

import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Homepage } from './Homepage';
import { Congress } from './Congress';
import { Search } from './Search';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-main">
          <Nav />
          <Route exact path="/" component={ Homepage } />
          <Route path="/congress" component={ Congress } />
          <Route path="/search" component={ Search } />
          <Footer />
      </div>
      </Router>
    );
  }
}

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand fixed-top">
      <div className='container'>
        <a href="https://www.usa.gov/register-to-vote">
            <img className="nav-logo" src="data/votelogo.png" width="100" height="50" alt="I voted sticker logo that links to a voting registration site"></img>
        </a>
        <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link active" to="/">Home</Link></li>
            { ' ' }
            <li className="nav-item"><Link className="nav-link" to="/congress">Congress</Link></li>
            { ' ' }
            <li className="nav-item"><Link className="nav-link" to="/search">Contact</Link></li>
            { ' ' }
        </ul>
      </div>
      </nav>
    );
  }
}

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="container">
            <a href="https://www.usa.gov/register-to-vote" target='_blank'>
                <img className="footer-logo" src="data/votelogo.png" width="100" height="50" alt="I voted sticker logo that links to a voting registration site"></img>
            </a>
        </div>
      </footer>
    );
  }
}

export default App;
