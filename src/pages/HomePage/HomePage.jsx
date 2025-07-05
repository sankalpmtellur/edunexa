import React, { useState } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import UserProfileBar from '../../components/UserProfileBar';

const HomePage = () => {
  const navigate = useNavigate();
  const rawName = localStorage.getItem('fullname') || 'User';
  const username = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  const [difficulty, setDifficulty] = useState('Easy');
  const [open, setOpen] = useState(false);

  const handleStart = () => {
    navigate(`/quiz/${difficulty.toLowerCase()}`);
  };

  return (
    <div className="home-container">
      <UserProfileBar />

      <div className="home-content">
        <h1>Welcome, {username}!</h1>
        <p>Get ready to test your math skills!</p>

        <div className="dropdown-container">
          <label>Select Difficulty:</label>
          <div className="custom-dropdown">
            <div className="dropdown-selected" onClick={() => setOpen(!open)}>
              {difficulty}
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

        <button className="start-button" onClick={handleStart}>
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default HomePage;