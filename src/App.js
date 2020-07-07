import React from 'react';
import './App.css';
import Form from './components/form';

function App() {
  return (
    <div className="App">
      {console.log(process.env)}
      <Form />
      <footer>Developed by an Idiot</footer>
    </div>
  );
}

export default App;
