// src/components/ResultModal.js
import React from 'react';
import './ResultModal.css';

const ResultModal = ({ show, onClose, result, countryData, isCorrect }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{isCorrect ? "You were Correct!" : "Sorry, that was Incorrect!"}</h2>
        <img src={result.flagSrc} alt={countryData.country} />
        <div className="country-info">
          <p><strong>Country:</strong> {countryData.country}</p>
          <p><strong>Capital City:</strong> {countryData.capitalCity}</p>
          <p><strong>Continent:</strong> {countryData.continent}</p>
          <p><strong>Native Language:</strong> {countryData.language}</p>
          <p><strong>How to say Hello:</strong> {countryData.hello}</p>
        </div>
        <button onClick={onClose}>Continue</button>
      </div>
    </div>
  );
};

export default ResultModal;