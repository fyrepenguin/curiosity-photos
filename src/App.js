import React from 'react';

import './App.css';

import Form from './components/form';

function App() {
  return (
    <>

      <header>
        <h1>
          Mars Curiosity Rover Photo Viewer
      </h1>
      </header>

      <Form />
      <footer className='interactive'>Developed by <a href="https://github.com/fyrepenguin/">Mourya</a></footer>
    </>
  );
}

export default App;
