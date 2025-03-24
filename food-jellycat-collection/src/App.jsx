// Main React component (equivalent to HTML body)

import './App.css'
import Dashboard from './Dashboard';
import React from 'react';



const App = () => {

  const [title, setTitle] = ("");
  
  return (
    <div className="app">

      <div className="control-header">
        <span class="material-symbols-outlined">menu</span>
      </div>

      <div className="main-header">
        <h1>jellycat dinner collection</h1>
        <h2>let's throw a spectacular dinner party !</h2>
      </div>

      <div className="menu">
        <h1></h1>
      </div>
      <Dashboard/>
    </div>
  );
};

export default App;
