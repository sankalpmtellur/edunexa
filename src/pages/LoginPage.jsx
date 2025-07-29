import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import logo from '../../public/logo.webp';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password } = userData;

    if (!email || !password || (isSignup && !fullName)) {
      return alert('Please fill all required fields');
    }
    if (password.length < 4) {
      return alert('Password must be at least 4 characters');
    }

    setLoading(true);

    try {
      let response;
      if (isSignup) {
        // Sign up new user
        response = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (response.error) throw response.error;
        alert('Account created! Check your email to confirm.');
      } else {
        // Login existing user
        response = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (response.error) throw response.error;
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/home');
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google OAuth
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    if (error) {
      console.error('Google Login Error:', error.message);
      alert('Google login failed!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="EduNexa Logo" className="login-logo" />
        <h2 className="login-title">{isSignup ? 'Sign Up' : 'Login'}</h2>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={userData.fullName}
              onChange={handleChange}
              className="input-box"
              required={isSignup}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            className="input-box"
            required
          />
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password (min 4 chars)"
              value={userData.password}
              onChange={handleChange}
              className="input-box"
              required
              minLength={4}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? (isSignup ? 'Signing up...' : 'Logging in...') : isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className="or-divider">OR</div>
        <button className="google-button" onClick={handleGoogleLogin}>
          Continue with Google
        </button>

        <p className="switch-text">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            className="switch-button"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? 'Login' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;