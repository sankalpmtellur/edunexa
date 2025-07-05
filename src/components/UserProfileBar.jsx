import React, { useState, useEffect, useRef } from 'react';
import './UserProfileBar.css';

const UserProfileBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const username = user?.name || 'User';
  const profilePic =
    user?.picture && user.picture !== 'null'
      ? user.picture
      : '/profile.webp';

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="profile-bar" ref={dropdownRef}>
      <span className="user-name">{username}</span>
      <div
        className="profile-wrapper"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <img src={profilePic} alt="Profile" className="profile-pic" />
        {showDropdown && (
          <div className="profile-dropdown">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileBar;