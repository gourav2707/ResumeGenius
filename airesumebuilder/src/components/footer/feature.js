import React from 'react';
import { Link } from 'react-router-dom';
import './Feature.css';
import Back from './back';

const Features = () => {
  const features = [
    {
      title: "Professional Templates",
      description: "Choose from dozens of ATS-friendly, professionally designed resume templates.",
      icon: "fas fa-file-alt"
    },
    {
      title: "Easy Editing",
      description: "Our intuitive editor makes building your resume as simple as filling in the blanks.",
      icon: "fas fa-edit"
    },
    {
      title: "Multiple Formats",
      description: "Download your resume as PDF, DOCX, or plain text with perfect formatting.",
      icon: "fas fa-file-export"
    },
    {
      title: "ATS Optimization",
      description: "Our resumes are designed to pass through applicant tracking systems with ease.",
      icon: "fas fa-robot"
    },
    {
      title: "Cloud Storage",
      description: "Save unlimited resumes and access them from anywhere, anytime.",
      icon: "fas fa-cloud"
    },
    {
      title: "Cover Letters",
      description: "Create matching cover letters to complement your resume.",
      icon: "fas fa-envelope-open-text"
    }
  ];

  return (
    <div className="features-page">
      <section className="hero">
        <div className="container">
          <h1>Powerful Features to Build Your Perfect Resume</h1>
          <p>Everything you need to create a resume that gets you interviews</p>
        </div>
      </section>
        <Back/>
      <section className="features-list">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Build Your Resume?</h2>
          <Link to="/register" className="btn-primary btn-large">Get Started for Free</Link>
        </div>
      </section>
    </div>
  );
};

export default Features;