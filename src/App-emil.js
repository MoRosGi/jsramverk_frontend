import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Doc from './Doc.js';
// import Report from './Report.js';

import './App.css';

const App = () => (
  <Router>
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Doc</Link>
          </li>
        </ul>
      </nav>
      <Route exact path="/" component={Doc} />
    </div>
  </Router>
);

export default App;
