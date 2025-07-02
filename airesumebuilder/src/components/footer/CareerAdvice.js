import React from 'react';
import { Link } from 'react-router-dom';
import './CareerAdvice.css';
import Back from './back';
const CareerAdvice = () => {
  const articles = [
    {
      title: "How to Tailor Your Resume for Different Jobs",
      excerpt: "Learn how to customize your resume for each application without starting from scratch.",
      category: "Resume Tips"
    },
    {
      title: "10 In-Demand Skills for 2023",
      excerpt: "Discover which skills employers are looking for this year and how to highlight them.",
      category: "Career Growth"
    },
    {
      title: "Navigating Career Changes Successfully",
      excerpt: "Strategies for transitioning to a new industry or role without starting at the bottom.",
      category: "Career Growth"
    },
    {
      title: "How to Write a Cover Letter That Gets Noticed",
      excerpt: "Tips for crafting a compelling cover letter that complements your resume.",
      category: "Application Tips"
    },
    {
      title: "Salary Negotiation Strategies That Work",
      excerpt: "How to negotiate your salary with confidence and get what you're worth.",
      category: "Career Growth"
    },
    {
      title: "Building a Strong Personal Brand Online",
      excerpt: "How to create a professional online presence that supports your job search.",
      category: "Digital Presence"
    }
  ];

  return (
    <div className="career-advice-page">
      <section className="hero">
        <div className="container">
          <h1>Career Advice & Professional Development</h1>
          <p>Expert tips to help you navigate your career path and job search</p>
        </div>
      </section>
   <Back/>
      <section className="advice-content">
        <div className="container">
          <div className="articles-grid">
            {articles.map((article, index) => (
              <div className="article-card" key={index}>
                <div className="article-category">{article.category}</div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <Link to={`/career-advice/${article.title.toLowerCase().replace(/ /g, '-')}`} className="read-more">
                  Read More <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerAdvice;