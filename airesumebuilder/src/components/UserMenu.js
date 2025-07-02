import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserMenu.css';
import axios from 'axios';

function UserMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const storedUser = JSON.parse(sessionStorage.getItem("user")) || {};
  const user = {
    email: storedUser.email || "guest@example.com"
  };

  const logout = () => {
    sessionStorage.clear();
    delete axios.defaults.headers.common['Authorization'];
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="user-menu-wrapper d-flex">
        <button className='back-button' onClick={()=>navigate(-1)}>← Back</button>
      <button className="profile-button "    onClick={() => setOpen(!open)}>
        ⚙️
      </button>

      {open && (
        <div className="user-menu-dropdown">
          <h4>{user.name}</h4>
          <p>{user.email}</p>
          <hr />
          <div className="menu-item" onClick={() => navigate('/settings')}>
            ⚙️ Account Settings
          </div>
          <div className="menu-item" onClick={() => navigate('/faq')}>
            ❓ FAQ
          </div>
          <div className="menu-item logout" onClick={logout}>
            🔓 Log Out
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
