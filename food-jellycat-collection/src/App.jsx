// Main React component (equivalent to HTML body)

import './App.css'
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import MemoryGame from './MemoryGame';
import MatchingGame from './MatchingGame';


const App = () => {
  
  return (
    <Router>
      <div className="app">
        
        <NavBar/>

        <div className="main-header animated-item">
          <h1>jellycat food collection</h1>
        </div>

        <div className="page">
          <h1></h1>
        </div>
      </div>

      <Routes>
        <Route
          exact
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/memorygame"
          element={<MemoryGame />}
        />

        <Route
          path="/matchinggame"
          element={<MatchingGame />}
        />

        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
