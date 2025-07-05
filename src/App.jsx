import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import Quiz from './pages/HomePage/Quiz';
import ScoreCard from './pages/HomePage/ScoreCard';

function App() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('user');

  return (
    <Routes key={location.pathname}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/home"
        element={isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/quiz/:difficulty"
        element={isLoggedIn ? <Quiz /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/scorecard"
        element={isLoggedIn ? <ScoreCard /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;