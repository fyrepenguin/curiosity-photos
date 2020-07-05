import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  return (
    <div className="App">
      Mars Rover Photo Viewer
      <div className="form">
        <input type="number" name="sol" id="sol" min="1" />
        <select name="camera" id="camera">
          <option value="blah">blah</option>
          <option value="bleh">bleh</option>
        </select>
        <button type="submit">Submit</button>
      </div>
    </div>
  );
}

export default App;
