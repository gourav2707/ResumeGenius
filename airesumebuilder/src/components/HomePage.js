import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Make sure this path is correct

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-containerr">
      {/* Hero Section */}
      <header className="hero-section">
        <nav className="navbar">
          <div className="logo">ResumeGenius</div>
          <div className="auth-buttons">
            <button onClick={() => navigate('/login')} className="btn-login">Log In</button>
            <button onClick={() => navigate('/register')} className="btn-signup">Sign Up</button>
          </div>
        </nav>
        
        <main className="hero-content">
          <h1>Build a Resume That Gets You Hired</h1>
          <p className="subtitle">AI-powered resume builder that helps you create the perfect resume in minutes</p>
          <button className="cta-button" onClick={() => navigate('/register')}>
            Create My Resume - It's Free
          </button>
          
          <div className="preview-container">
             
            <div className="floating-badge">
              <span>ATS Optimized</span>
            </div>
          </div>
        </main>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose ResumeGenius?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon">✨</div>
            <h3>AI-Powered Suggestions</h3>
            <p>Get intelligent content recommendations tailored to your target job</p>
          </div>
          <div className="feature-card">
            <div className="icon">📊</div>
            <h3>ATS Optimization</h3>
            <p>Beat applicant tracking systems with our smart formatting</p>
          </div>
          <div className="feature-card">
            <div className="icon">🎨</div>
            <h3>Beautiful Templates</h3>
            <p>Professional designs that impress recruiters</p>
          </div>
          <div className="feature-card">
            <div className="icon">⚡</div>
            <h3>Quick Creation</h3>
            <p>Build a resume in 15 minutes or less</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>Trusted by Job Seekers Worldwide</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"Got 3x more interviews after using ResumeGenius!"</p>
            <div className="user-info">
              <img src="/user.jpg" alt="Sarah, a satisfied user" />
              <span>Sarah, Marketing Manager</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="final-cta">
        <h2>Ready to Build Your Winning Resume?</h2>
        <button className="cta-button" onClick={() => navigate('/register')}>
          Get Started Now - Free Forever
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 ResumeGenius. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
