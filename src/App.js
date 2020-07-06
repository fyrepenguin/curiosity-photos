import React from 'react';
import './App.css';

function App() {
  const NasaAPIKey = process.env.REACT_APP_API_KEY;
  //console.log(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${NasaAPIKey}`);
  return (
    <div className="App">
      Mars Curiosity Rover Photo Viewer
      <div className="form">
        <input type="number" name="sol" id="sol" min="0" />
        <select name="camera" id="camera">
          <option value="FHAZ">Front Hazard Avoidance Camera</option>
          <option value="RHAZ">Rear Hazard Avoidance Camera</option>
          <option value="MAST">Mast Camera</option>
          <option value="CHEMCAM">Chemistry and Camera Complex</option>
          <option value="MAHLI">Mars Hand Lens Imager</option>
          <option value="MARDI">Mars Descent Imager</option>
          <option value="NAVCAM">Navigation Camera</option>
        </select>
        <button type="submit">Submit</button>
      </div>
    </div>
  );
}

export default App;
