import React, { useState, useEffect } from 'react';
import Flag from './Flag';
import ResultModal from './ResultModal';
import { shuffleArray } from '../utils/shuffle';

const easyFlags = ["US", "CA", "GB", "FR", "DE", "IT", "ES", "CN", "JP", "AU", "RU", "BR", "IN", "MX"];
const mediumFlags = ["AR", "ZA", "KR", "NL", "SE", "NO", "DK", "FI", "BE", "CH", "PL", "PT", "AT", "GR", "TR", "SA", "EG", "IL", "NZ", "IE"];
const hardFlags = ["AD", "AE", "AF", "AG", "AM", "AZ", "BA", "BD", "BH", "BY", "BO", "BW", "HR", "CY", "CZ", "DO", "EE", "ET", "FJ", "GE", "GH", "GT", "HN", "HU", "ID", "IQ", "IR", "JM", "JO", "KE", "KW", "LB", "LT", "LU", "MY", "MT", "MU", "MD", "MN", "MA", "NA", "NP", "NG", "MK", "OM", "PK", "PA", "PG", "PY", "PE", "PH", "QA", "RO", "RS", "SG", "SK", "SI", "LK", "SY", "TH", "TT", "TN", "UA", "UZ", "VE", "VN", "ZM", "ZW"];
const extremelyHardFlags = ["AI", "AO", "AQ", "AS", "AW", "AX", "BB", "BZ", "BJ", "BM", "BT", "BV", "BF", "BI", "CV", "BQ", "CC", "KM", "CK", "CW", "DJ", "DM", "GQ", "FO", "GF", "PF", "TF", "GA", "GL", "GD", "GP", "GU", "GN", "GW", "GY", "HM", "IM", "KZ", "KI", "XK", "KG", "LA", "LS", "LR", "LY", "MO", "MG", "MW", "MV", "ML", "MH", "MQ", "MR", "YT", "FM", "MC", "ME", "MS", "MM", "NR", "NC", "NI", "NE", "NF", "MP", "PW", "PS", "PN", "PR", "RE", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SN", "SC", "SL", "SX", "SB", "SO", "GS", "SS", "SR", "SJ", "SZ", "TJ", "TZ", "TL", "TG", "TK", "TO", "TM", "TC", "TV", "UM", "VU", "VG", "VI", "WF", "EH", "YE"];

const difficultyLevels = {
  easy: easyFlags,
  medium: mediumFlags,
  hard: hardFlags,
  extremelyHard: extremelyHardFlags,
};

const Quiz = ({ difficulty }) => {
  const [flags, setFlags] = useState([]);
  const [currentFlagIndex, setCurrentFlagIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState({});
  const [isCorrect, setIsCorrect] = useState(false);
  const [countriesData, setCountriesData] = useState({});

  useEffect(() => {
    fetch('/flags/countries.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setCountriesData(data);
        initializeGame(data);
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, [difficulty]);

  const initializeGame = (data) => {
    const selectedFlags = difficultyLevels[difficulty];
    const formattedFlags = selectedFlags.map((key) => {
      const countryData = data[key];
      if (!countryData) {
        console.warn(`No data found for key: ${key}`);
        return null;
      }
      return {
        src: `/flags/png250px/${key.toLowerCase()}.png`,
        country: countryData.country,
        options: getOptions(data, countryData.country, difficulty),
        data: countryData
      };
    }).filter(flag => flag !== null);
    setFlags(shuffleArray(formattedFlags));
    setCurrentFlagIndex(0);
    setScore(0);
    setLives(3);
  };

  const getOptions = (data, correctCountry, difficulty) => {
    const countries = Object.values(data).map(item => item.country);
    const options = [correctCountry];
    const numOptions = 4;
    while (options.length < numOptions) {
      const randomCountry = countries[Math.floor(Math.random() * countries.length)];
      if (!options.includes(randomCountry)) {
        options.push(randomCountry);
      }
    }
    return shuffleArray(options);
  };

  const handleAnswer = (selectedCountry) => {
    const correctCountry = flags[currentFlagIndex].country;
    const isCorrectAnswer = selectedCountry === correctCountry;
    setIsCorrect(isCorrectAnswer);
    setResult({
      message: isCorrectAnswer ? "Well done Aaliyah! You were Correct!" : "Sorry Aaliyah - that was incorrect",
      flagSrc: flags[currentFlagIndex].src
    });

    if (isCorrectAnswer) {
      setScore(score + 1);
    } else {
      setLives(lives - 1);
    }

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (lives === 0) {
      alert(`Game over! Your score is ${score}`);
      initializeGame(countriesData);
    } else {
      setCurrentFlagIndex((currentFlagIndex + 1) % flags.length);
    }
  };

  if (flags.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Flag Quiz</h1>
      <Flag src={flags[currentFlagIndex].src} />
      <div>
        {flags[currentFlagIndex].options.map((option, index) => (
          <button key={index} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
      <p>Score: {score}</p>
      <p>Lives: {lives}</p>
      <ResultModal
        show={showModal}
        onClose={handleCloseModal}
        result={result}
        countryData={flags[currentFlagIndex].data}
        isCorrect={isCorrect}
      />
    </div>
  );
};

export default Quiz;