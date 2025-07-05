import React, { useState } from 'react';
import './UserProfileBar.css';

const UserProfileBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const username = localStorage.getItem('fullname') || 'User';
  const storedProfilePic = localStorage.getItem('profilePic');

  const profilePic =
    storedProfilePic && storedProfilePic !== 'null'
      ? storedProfilePic
      : '/profile.webp';

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="profile-bar">
      <span className="user-name">{username}</span>
      <div className="profile-wrapper" onClick={() => setShowDropdown(!showDropdown)}>
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