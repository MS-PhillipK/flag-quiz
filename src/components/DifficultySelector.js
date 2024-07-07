// src/components/DifficultySelector.js
import React from 'react';

const DifficultySelector = ({ setDifficulty }) => {
  return (
    <div>
      <h1>Select Difficulty</h1>
      <button onClick={() => setDifficulty('easy')}>Easy</button>
      <button onClick={() => setDifficulty('medium')}>Medium</button>
      <button onClick={() => setDifficulty('hard')}>Hard</button>
      <button onClick={() => setDifficulty('extremelyHard')}>Extremely Hard</button>
    </div>
  );
};

export default DifficultySelector;
