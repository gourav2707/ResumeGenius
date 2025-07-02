import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa';
import './FAQ.css';
import Back from './footer/back';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I create a resume with ResumeGenius?",
      answer: "Simply sign up for an account, choose a template, and fill in your information. Our builder will guide you through each section with helpful tips and examples."
    },
    {
      question: "Is my personal information secure?",
      answer: "Absolutely! We use industry-standard encryption and never share your data with third parties without your consent."
    },
    {
      question: "Can I download my resume in different formats?",
      answer: "Yes, you can download your resume as PDF, DOCX, or plain text. Premium users get additional format options."
    },
    {
      question: "How do I customize my resume design?",
      answer: "After selecting a template, you can change colors, fonts, and layout options in the design panel. All changes are previewed in real-time."
    },
    {
      question: "What if I need help with my resume content?",
      answer: "We offer built-in writing suggestions and examples for each section. Premium users get access to our expert resume review service."
    },
    {
      question: "Can I create multiple versions of my resume?",
      answer: "Yes, you can save unlimited resume versions and customize each for different job applications."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can manage your subscription in the Account Settings page. Cancellations take effect at the end of your billing cycle."
    }
  ];

  return (
    <> 
    <Back/>
    <div className="faq-container">
      <div className="faq-header">
        <FaQuestionCircle className="faq-icon" />
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about ResumeGenius</p>
      </div>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <h3>{faq.question}</h3>
              {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="faq-contact">
        <h2>Still have questions?</h2>
        <p>Our support team is ready to help you</p>
        <button className="contact-button">Contact Support</button>
      </div>
    </div>
 </> );
};

export default FAQ;