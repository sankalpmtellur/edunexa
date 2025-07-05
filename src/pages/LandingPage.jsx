import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-box">
        <h1 className="landing-title">EduNexa</h1>
        <p className="landing-tagline">Learn math. Practice smart. Grow fast.</p>
        <button className="start-button" onClick={() => navigate('/login')}>
          Let's Start
        </button>
      </div>
    </div>
  );
}

export default LandingPage;