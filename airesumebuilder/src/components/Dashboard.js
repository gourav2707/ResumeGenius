import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import UserMenu from './UserMenu';
import axios from 'axios';
import moment from 'moment';
import Apis from '../Apis';
const Dashboard = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(sessionStorage.getItem("user")) || {};
    

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get(Apis.GET_RESUMES, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        });
        setResumes(response.data.resumes);
      } catch (err) {
        setError("Failed to fetch resumes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(Apis.DELETE_RESUMES+`${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResumes(resumes.filter(resume => resume._id !== id));
    } catch (err) {
      console.error('Failed to delete resume:', err);
    }
  };

  const templateResumes = resumes.filter(resume => resume.template !== 'custom');
  const customResumes = resumes.filter(resume => resume.template === 'custom');

  return (
    <div className="dashboard-container">
      
          
          <UserMenu />
        
       

       
      <main className="dashboard-main">
        <section className="welcome-section">
          <h2>Welcome back, {storedUser.username || 'User'}!</h2>
          <p>Ready to create your next winning resume?</p>
        </section>

         
        <section className="creation-options">
          <h3 className="section-title">Start Building</h3>
          <div className="options-grid">
            <div className="option-card template-option" onClick={() => navigate('/select-template')}>
              <div className="option-icon"><i className="fas fa-file-alt"></i></div>
              <h4>Use a Template</h4>
              <p>Choose from our professionally designed resume templates</p>
              <button className="option-button">Browse Templates</button>
              <div className="popular-badge">Most Popular</div>
            </div>

            <div className="option-card custom-option" onClick={() => navigate('/custom-editor')}>
              <div className="option-icon"><i className="fas fa-pencil-ruler"></i></div>
              <h4>Custom Design</h4>
              <p>Start from scratch with complete design control</p>
              <button className="option-button">Start Building</button>
            </div>
          </div>
        </section>

        
        {loading ? (
          <div className="loading-state"><i className="fas fa-spinner fa-spin"></i> Loading...</div>
        ) : (
          <>
            {templateResumes.length > 0 && (
              <section className="recent-resumes">
                <h3 className="section-title">📄 Template-Based Resumes</h3>
                <div className="resumes-list">
                  {templateResumes.map(resume => (
                    <div key={resume._id} className="resume-card">
                      <div className="resume-info">
                        <h4>{resume.fullName || 'Untitled Resume'}</h4>
                        <p className="resume-date">Last updated: {moment(resume.updatedAt).format('MMM D, YYYY')}</p>
                        <div className="resume-template">Template: {resume.templateName || 'Default'}</div>
                      </div>
                      <div className="resume-actions">
                        <button onClick={() => navigate(`/edit-template/${resume._id}`)} className="action-button edit-button">
                          <i className="fas fa-edit"></i> Edit
                        </button>
                        <button onClick={() => navigate(`/viewresume/${resume._id}`)} className="action-button view-button">
                          <i className="fas fa-eye"></i> View
                        </button>
                        <button onClick={() => handleDelete(resume._id)} className="action-button delete-button">
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {customResumes.length > 0 && (
              <section className="recent-resumes">
                <h3 className="section-title">🎨 Custom-Designed Resumes</h3>
                <div className="resumes-list">
                  {customResumes.map(resume => (
                    <div key={resume._id} className="resume-card">
                      <div className="resume-info">
                        <h4>{resume.fullName || 'Untitled Resume'}</h4>
                        <p className="resume-date">Last updated: {moment(resume.updatedAt).format('MMM D, YYYY')}</p>
                        <div className="resume-template">Template: Custom</div>
                      </div>
                      <div className="resume-actions">
                        <button onClick={() => navigate(`/editresume/${resume._id}`)} className="action-button edit-button">
                          <i className="fas fa-edit"></i> Edit
                        </button>
                        <button onClick={() => navigate(`/viewresume/${resume._id}`)} className="action-button view-button">
                          <i className="fas fa-eye"></i> View
                        </button>
                        <button onClick={() => handleDelete(resume._id)} className="action-button delete-button">
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {resumes.length === 0 && (
              <div className="empty-state">
                <i className="fas fa-file-import"></i>
                <p>You haven't created any resumes yet</p>
                <button className="cta-button" onClick={() => navigate('/select-template')}>
                  Create Your First Resume
                </button>
              </div>
            )}
          </>
        )}
      </main>

      
      <footer className="dashboard-footer">
        <p>© {new Date().getFullYear()} ResumeGenius. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
