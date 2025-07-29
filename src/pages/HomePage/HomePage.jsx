import React, { useState } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import UserProfileBar from '../../components/UserProfileBar';
import logo from '/logo.webp';

const HomePage = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState('');
  const [open, setOpen] = useState(false);

  const handleStart = () => {
    console.log("🚀 Navigating to quiz with difficulty:", difficulty);
    navigate(`/quiz/${difficulty.toLowerCase()}`);
  };

  return (
    <div className="home-container">
      <UserProfileBar />

      <div className="home-content">
        <img src={logo} alt="EduNexa Logo" className="home-logo" />
        <h1>
          Welcome to <span className="brand-name">EduNexa</span>
        </h1>
        <p>Sharpen your math skills with fun, interactive quizzes!</p>

        <div className="dropdown-container">
          <label>Select Difficulty:</label>
          <div className="custom-dropdown">
            <div
              className="dropdown-selected"
              onClick={() => setOpen(!open)}
            >
              {difficulty || 'Select'}
              <span className="arrow">&#9662;</span>
            </div>
            {open && (
              <div className="dropdown-options">
                {['Easy', 'Medium', 'Hard'].map((level) => (
                  <div
                    key={level}
                    className={`dropdown-option ${difficulty === level ? 'active' : ''}`}
                    onClick={() => {
                      setDifficulty(level);
                      setOpen(false);
                    }}
                  >
                    {level}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          className="start-button"
          disabled={!difficulty}
          onClick={handleStart}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default HomePage;