import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';  
import '@fortawesome/fontawesome-free/css/all.min.css';
import classic from "../images/classic.png"
const Home = () => {
  return (
    <div className="home-page">
      
      <header>
        <nav className="container">
          <div className="logo">
            <i className="fas fa-file-alt"></i>
            <span>ResumeGenius</span>
          </div>
          <div className="nav-links">
            
            <Link to="/login" className="btn-login">Login</Link>
            <Link to="/register" className="btn-signup">Get Started</Link>
          </div>
        </nav>
      </header>

      
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Build a Resume That Gets You Hired</h1>
            <p className="subtitle">Create a professional resume in minutes with our easy-to-use builder and proven templates</p>
            <div className="cta-buttons">
              <Link to="/login" className="btn-primary btn-large">Create My Resume</Link>
              <Link to="/login" className="btn-outline btn-large">See Templates</Link>
            </div>
            <div className="trust-badges">
              <div className="badge">
                <i className="fas fa-check-circle"></i>
                <span>ATS Friendly</span>
              </div>
              <div className="badge">
                <i className="fas fa-shield-alt"></i>
                <span>100% Secure</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://www.myperfectresume.com/wp-content/uploads/2025/02/MPR-2025-01-ats-resume-checker-hero@2x.png?w=768" alt="Resume Example" />
          </div>
        </div>
      </section>

       
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose ResumeGenius?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-magic"></i>
              </div>
              <h3>Easy to Use</h3>
              <p>Our intuitive builder guides you through the process with helpful tips and examples.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-file-export"></i>
              </div>
              <h3>Multiple Formats</h3>
              <p>Download your resume as PDF, DOCX, or TXT with perfect formatting every time.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-robot"></i>
              </div>
              <h3>ATS Optimized</h3>
              <p>Our templates are designed to pass through Applicant Tracking Systems with ease.</p>
            </div>
          </div>
        </div>
      </section>

      
    
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">Success Stories</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"ResumeGenius helped me create a professional resume that got me interviews at top tech companies."</p>
              </div>
              <div className="testimonial-author">
                <img src="https://cdn-images.kyruus.com/providermatch/baptisthealthky/photos/orig/smith-sarah-1932489978.jpg" alt="Sarah K." />
                <div>
                  <h4>Sarah K.</h4>
                  <p>Software Engineer at Google</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"I landed my dream job within 2 weeks of using my new resume from ResumeGenius!"</p>
              </div>
              <div className="testimonial-author">
                <img src="https://th.bing.com/th/id/OIP.xyzXMmbUxhUS8q3PMDJc0wHaHa?rs=1&pid=ImgDetMain&cb=idpwebpc2" alt="Michael T." />
                <div>
                  <h4>Michael T.</h4>
                  <p>Marketing Director at Amazon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Build Your Perfect Resume?</h2>
          <p>Join thousands of professionals who've accelerated their careers with ResumeGenius</p>
          <Link to="/register" className="btn-primary btn-large">Get Started for Free</Link>
        </div>
      </section>

       
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="logo">
                <i className="fas fa-file-alt"></i>
                <span>ResumeGenius</span>
              </div>
              <p>Building better resumes for better careers since 2023.</p>
              <div className="social-links">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Product</h4>
              <ul>
                <li><Link to="/features">Features</Link></li>
                
              </ul>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <ul>
                 
                <li><Link to="/career-advice">Career Advice</Link></li>
                <li><Link to="/resume-tips">Resume Tips</Link></li>
                
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} ResumeGenius. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;