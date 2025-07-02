import React from 'react';

const TemplateATS = ({ data = {}, education = [], experience = [] }) => {
  const skills = Array.isArray(data.skills) ? data.skills : [];
  const strengths = Array.isArray(data.strengths) ? data.strengths : [];
  const certifications = Array.isArray(data.certifications) ? data.certifications : [];
  const hobbies = Array.isArray(data.hobbies) ? data.hobbies : [];
  const projects = Array.isArray(data.projects) ? data.projects : [];

  if (!data.fullName) return <p>No data available</p>;
 
  return (
    <div
      style={{
        width: '794px',
        height: '1123px',
        padding: '30px',
        fontFamily: 'Arial, sans-serif',
        color: '#1a1a1a',
        fontSize: '13.5px',
        lineHeight: '1.4',
        margin: 'auto',
        backgroundColor: '#ffffff',
        border: '1px solid #ccc',
        overflowY: 'auto',
        boxSizing: 'border-box'
      }}
    >
      {/* Header */}
      <div style={{ borderBottom: '1.5px solid #000', paddingBottom: '8px', marginBottom: '14px' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>{data.fullName}</h1>
        <p style={{ margin: '4px 0' }}>
          <strong>Email:</strong> {data.email} | <strong>Phone:</strong> {data.phone} | <strong>Location:</strong> {data.location}
        </p>
      </div>

      {data.careerObjective && (
        <Section title="Career Objective">
          <p>{data.careerObjective}</p>
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          {education.map((edu, i) => (
            <p key={i} style={{ margin: '3px 0' }}>
              <strong>{edu.degree}</strong>, {edu.institution} ({edu.year})
            </p>
          ))}
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '6px' }}>
              <strong>{exp.role}</strong> at {exp.company} ({exp.duration})
              <p style={{ marginTop: '3px' }}>{exp.description}</p>
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '5px' }}>
              <strong>{proj.title}</strong><br />
              <span>{proj.description}</span><br />
              <a href={proj.link} target="_blank" rel="noopener noreferrer">{proj.link}</a>
            </div>
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills">
          <List items={skills} />
        </Section>
      )}

      {strengths.length > 0 && (
        <Section title="Strengths">
          <List items={strengths} />
        </Section>
      )}

      {certifications.length > 0 && (
        <Section title="Certifications">
          <List items={certifications} />
        </Section>
      )}

      {hobbies.length > 0 && (
        <Section title="Hobbies">
          <List items={hobbies} />
        </Section>
      )}
    </div>
  );
};

// Reusable section wrapper
const Section = ({ title, children }) => (
  <div style={{ marginBottom: '12px' }}>
    <h2 style={{
      fontSize: '16px',
      borderBottom: '1px solid #ccc',
      paddingBottom: '2px',
      marginBottom: '6px'
    }}>{title}</h2>
    {children}
  </div>
);

// Reusable list component
const List = ({ items }) => (
  <ul style={{ margin: 0, paddingLeft: '18px' }}>
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

export default TemplateATS;
