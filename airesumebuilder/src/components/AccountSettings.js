import React from 'react';
import { FaUser, FaEnvelope, FaLock, FaBell, FaPalette, FaFileExport, FaTrash } from 'react-icons/fa';
import './AccountSettings.css';
import Back from './footer/back';

const AccountSettings = () => {
  return (
    <> 
    <Back/>
    <div className="settings-container">
      <div className="settings-header">
        <h1>Account Settings</h1>
        <p>Manage your ResumeGenius account preferences</p>
      </div>

      <div className="settings-grid">
        {/* Profile Settings */}
        <div className="settings-card">
          <div className="settings-card-header">
            <FaUser className="settings-icon" />
            <h2>Profile Information</h2>
          </div>
          <div className="settings-card-body">
            <div className="settings-item coming-soon">
              <label>Full Name</label>
              <p>John Wick</p>
              <span className="badge">Coming Soon</span>
            </div>
            <div className="settings-item coming-soon">
              <label>Email Address</label>
              <p>john@gmail.com</p>
              <span className="badge">Coming Soon</span>
            </div>
            <div className="settings-item coming-soon">
              <label>Profile Picture</label>
              <div className="avatar-placeholder"></div>
              <span className="badge">Coming Soon</span>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="settings-card">
          <div className="settings-card-header">
            <FaLock className="settings-icon" />
            <h2>Security</h2>
          </div>
          <div className="settings-card-body">
            <div className="settings-item coming-soon">
              <label>Password</label>
              <p>••••••••</p>
              <span className="badge">Coming Soon</span>
            </div>
            <div className="settings-item coming-soon">
              <label>Two-Factor Authentication</label>
              <p>Disabled</p>
              <span className="badge">Coming Soon</span>
            </div>
            <div className="settings-item coming-soon">
              <label>Connected Devices</label>
              <p>2 active sessions</p>
              <span className="badge">Coming Soon</span>
            </div>
          </div>
        </div>

        

        {/* Account Actions */}
        <div className="settings-card danger-zone">
          <div className="settings-card-header">
            <FaTrash className="settings-icon" />
            <h2>Account Actions</h2>
          </div>
          <div className="settings-card-body">
            <div className="settings-item coming-soon">
              <label>Export All Data</label>
              <button className="secondary-button">Request Export</button>
              <span className="badge">Coming Soon</span>
            </div>
            <div className="settings-item coming-soon">
              <label>Delete Account</label>
              <button className="danger-button">Delete My Account</button>
              <span className="badge">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default AccountSettings;