import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import Back from './back';
const About = () => {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Passionate about helping professionals showcase their skills effectively.",
      image: "/images/team-1.jpg"
    },
     
    {
      name: "Gourav Vishwakarma",
      role: "Lead Developer",
      bio: "Builds the technology that makes resume creation easy and effective.",
      image: "/images/team-3.jpg"
    }
  ];

  return (
    <div className="about-page">
      <section className="hero">
        <div className="container">
          <h1>About ResumeGenius</h1>
          <p>Helping professionals build better careers through better resumes</p>
        </div>
      </section>
       <Back/>
      <section className="our-story">
        <div className="container">
          <h2>Our Story</h2>
          <div className="story-content">
            <p>ResumeGenius was founded in 2025 with a simple mission: to make professional resume creation accessible to everyone. After seeing too many qualified professionals struggle with outdated resume formats and ineffective writing approaches, our team set out to create a better solution.</p>
            <p>Today, ResumeGenius has helped over 100,000 professionals create resumes that get them interviews at top companies. Our platform combines expert resume-writing knowledge with easy-to-use technology to help job seekers at all career levels.</p>
            <p>We believe that everyone deserves a resume that accurately represents their skills and experience in the best possible light. Our tools and resources are designed to remove the stress from resume writing and help you put your best foot forward.</p>
          </div>
        </div>
      </section>

      <section className="our-team">
        <div className="container">
          <h2>Meet the Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div className="team-card" key={index}>
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="bio">{member.bio}</p>
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

export default About;