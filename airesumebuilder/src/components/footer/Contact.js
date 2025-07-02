import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';
import Back from './back';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      <section className="hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you! Reach out with questions or feedback.</p>
        </div>
      </section>
<Back/>
      <section className="contact-content">
         
          <div className="contact-grid">
            <div className="contact-form">
              

            <div className="contact-info">
              <h2>Other Ways to Reach Us</h2>
              <div className="info-card">
                <i className="fas fa-envelope"></i>
                <h3>Email</h3>
                <p>support@resumegenius.com</p>
              </div>
              <div className="info-card">
                <i className="fas fa-phone-alt"></i>
                <h3>Phone</h3>
                <p>+91 8305419974</p>
              </div>
              <div className="info-card">
                <i className="fas fa-map-marker-alt"></i>
                <h3>Address</h3>
                <p>Marimata Road<br />MPIF Pologround,Indore. </p>
              </div>
              <div className="social-links">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;