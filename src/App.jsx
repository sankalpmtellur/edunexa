import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import Quiz from './pages/HomePage/Quiz';
import ScoreCard from './pages/HomePage/ScoreCard';
import Leaderboard from './pages/HomePage/Leaderboard';
import { supabase } from './supabaseClient';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('user'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        localStorage.setItem(
          'user',
          JSON.stringify({
            name: data.session.user.user_metadata.full_name || data.session.user.email,
            email: data.session.user.email,
            picture: data.session.user.user_metadata.avatar_url || null,
          })
        );
        setIsLoggedIn(true);

        if (location.pathname === '/login' || location.pathname === '/') {
          navigate('/home', { replace: true });
        }
      } else {
        localStorage.removeItem('user');
        setIsLoggedIn(false);

        // ✅ Only redirect to login if not already on login page
        if (location.pathname !== '/login') {
          navigate('/login', { replace: true });
        }
      }
      setLoading(false);
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        localStorage.setItem(
          'user',
          JSON.stringify({
            name: session.user.user_metadata.full_name || session.user.email,
            email: session.user.email,
            picture: session.user.user_metadata.avatar_url || null,
          })
        );
        setIsLoggedIn(true);
        if (event === 'SIGNED_IN') navigate('/home', { replace: true });
      } else {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/login', { replace: true });
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [navigate, location.pathname]);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes key={location.pathname}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />} />
      <Route path="/quiz/:difficulty" element={isLoggedIn ? <Quiz /> : <Navigate to="/login" replace />} />
      <Route path="/scorecard" element={isLoggedIn ? <ScoreCard /> : <Navigate to="/login" replace />} />
      <Route path="/leaderboard" element={isLoggedIn ? <Leaderboard /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;