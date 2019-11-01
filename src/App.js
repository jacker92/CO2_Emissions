import React from 'react';
import './App.css';
import Slider from './slider.js';
import SearchBox from './searchBox.js';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>CO² Emissions</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
          Learn React
      </header>
      <SearchBox />
      <Slider />
    </div>
  );
}

export default App;
