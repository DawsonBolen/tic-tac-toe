
import React, { useEffect } from 'react';
import './App.css';

import Board from './components/board';
import Header from './components/header';

function App() {
  return (
    <div className="App">
      <Header />
      <Board />
    </div>
  );
}

export default App;
