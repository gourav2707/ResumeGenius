import React from 'react';
import { Link } from 'react-router-dom';
import './ResumeTips.css';
import Back from './back';
const ResumeTips = () => {
  const tips = [
    {
      title: "Keep It Concise",
      description: "Limit your resume to 1-2 pages maximum. Recruiters typically spend just seconds scanning each resume."
    },
    {
      title: "Use Action Verbs",
      description: "Start bullet points with strong action verbs like 'Developed', 'Managed', 'Increased' to demonstrate impact."
    },
    {
      title: "Quantify Achievements",
      description: "Where possible, include numbers to show the scale of your accomplishments (e.g., 'Increased sales by 30%')."
    },
    {
      title: "Tailor for Each Job",
      description: "Customize your resume for each position by emphasizing relevant skills and experiences."
    },
    {
      title: "Optimize for ATS",
      description: "Use standard section headings and include keywords from the job description to pass automated screenings."
    },
    {
      title: "Professional Formatting",
      description: "Use a clean, consistent layout with sufficient white space for easy reading."
    }
  ];

  return (
    <div className="resume-tips-page">
      <section className="hero">
        <div className="container">
          <h1>Expert Resume Writing Tips</h1>
          <p>Professional advice to help you create a resume that stands out</p>
        </div>
      </section>
      <Back/>
      <section className="tips-content">
        <div className="container">
          <div className="tips-grid">
            {tips.map((tip, index) => (
              <div className="tip-card" key={index}>
                <div className="tip-number">{index + 1}</div>
                <h3>{tip.title}</h3>
                <p>{tip.description}</p>
              </div>
            ))}
          </div>
          
           
        </div>
      </section>
    </div>
  );
};

export default ResumeTips;