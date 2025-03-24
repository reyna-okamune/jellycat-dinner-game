// Main React component (equivalent to HTML body)

import './App.css'
import Dashboard from './Dashboard';
import React from 'react';



const App = () => {
  return (
    <div className="app">
      <header className="main-header">
        <h1>jellycat dinner collection</h1>
        <h2>let's throw a spectacular dinner party !</h2>
      </header>

      <Dashboard/>
    </div>
  );
};

export default App;
