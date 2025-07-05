import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { fullName, email, password } = userData;

    // Basic input validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      return alert('Please fill all fields');
    }
    if (!emailRegex.test(email)) {
      return alert('Please enter a valid email');
    }

    // Store user info for sample login
    localStorage.setItem('fullname', fullName.trim());
    localStorage.setItem('email', email.trim());
    localStorage.removeItem('profilePic'); // Fallback will be used

    setLoading(true);
    setTimeout(() => {
      navigate('/home');
    }, 300); // slight delay for UX
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    localStorage.setItem('fullname', decoded.name);
    localStorage.setItem('email', decoded.email);
    localStorage.setItem('profilePic', decoded.picture);

    navigate('/home');
  };

  const handleGoogleLoginFailure = () => {
    alert('Google Sign-In Failed. Please try again.');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={userData.fullName}
            onChange={handleChange}
            className="input-box"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            className="input-box"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            className="input-box"
            required
          />

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="or-divider">or</div>

        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
        />
      </div>
    </div>
  );
}

export default LoginPage;