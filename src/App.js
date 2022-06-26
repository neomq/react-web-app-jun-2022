import React from 'react';
import { Navbar } from './components';
import { Projects } from './containers';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Projects />
    </React.Fragment>
  );
}

export default App;
