// Main React component (equivalent to HTML body)

import './App.css'
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from './Dashboard';
import MemoryGame from './MemoryGame';
import MatchingGame from './MatchingGame';


const App = () => {

  const [title, setTitle] = ("");
  
  return (
    <Router>
      <div className="app">
        <div className="control-header">
          <span className="material-symbols-outlined">menu</span>
        </div>

        <div className="main-header">
          <h1>jellycat dinner collection</h1>
          <h2>let's throw a spectacular dinner party !</h2>
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
