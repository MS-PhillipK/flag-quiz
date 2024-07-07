// src/App.js
import React, { useState } from 'react';
import './App.css';
import Quiz from './components/Quiz';
import DifficultySelector from './components/DifficultySelector';
import ResultModal from './components/ResultModal';
import Flag from './components/Flag';

function App() {
  const [difficulty, setDifficulty] = useState(null);

  return (
    <div className="App">
      {difficulty ? (
        <Quiz difficulty={difficulty} />
      ) : (
        <DifficultySelector setDifficulty={setDifficulty} />
      )}
    </div>
  );
}

export default App;
