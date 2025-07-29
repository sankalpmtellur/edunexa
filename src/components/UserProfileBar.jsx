import React, { useState, useEffect, useRef } from 'react';
import './UserProfileBar.css';

const UserProfileBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const username = user?.name || 'User';

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
      <span
        className="user-name"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {username}
      </span>

      {showDropdown && (
        <div className="profile-dropdown">
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserProfileBar;