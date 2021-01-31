import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import Accepted from './pages/Accepted';
import Invited from './pages/Invited';

import "typeface-lato";
import './App.css';

/**
 * Master App Component
 */
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App container">
          <nav>
            <ul>
              <li>
                <NavLink activeClassName="active" exact to="/">Invited</NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" exact to="/accepted">Accepted</NavLink>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/accepted">
              <Accepted />
            </Route>
            <Route path="/">
              <Invited />
            </Route>
          </Switch>
          </div>
      </Router>
    );
  }
}

export default App;
