import React from 'react';

const TemplateModern = ({ data = {} }) => {
  if (!data?.fullName) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>No resume data to show.</div>;
  }

  const {
    fullName,
    email,
    phone,
    location,
    careerObjective,
    education = [],
    experience = [],
    skills = [],
    strengths = [],
    certifications = [],
    hobbies = [],
    projects = [],
  } = data;

  return (
    <div
      style={{
        width: '210mm', // Standard A4 width
        height: '297mm', // Standard A4 height
        display: 'grid',
        gridTemplateColumns: '30% 70%',
        padding: '15mm', // Proper print margins
        boxSizing: 'border-box',
        margin: '0 auto',
        fontFamily: "'Segoe UI', sans-serif",
        color: '#1a1a1a',
        backgroundColor: '#ffffff',
        border: '1px solid #ccc',
        overflow: 'hidden',
        pageBreakInside: 'avoid',
      }}
    >
      {/* LEFT COLUMN */}
      <div style={{ 
        borderRight: '1px solid #e0e0e0', 
        paddingRight: '10mm',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '5mm'
      }}>
        {/* Name and Contact */}
        <div>
          <h1 style={{ 
            fontSize: '22pt', 
            marginBottom: '4mm',
            color: '#2c3e50',
            fontWeight: 600
          }}>{fullName}</h1>
          <div style={{ fontSize: '10pt', lineHeight: 1.5 }}>
            {email && <div>📧 {email}</div>}
            {phone && <div>📞 {phone}</div>}
            {location && <div>📍 {location}</div>}
          </div>
        </div>

        {/* Left Column Sections */}
        <ListSection title="Skills" items={skills} />
        <ListSection title="Certifications" items={certifications} />
        <ListSection title="Hobbies" items={hobbies} />
      </div>

      {/* RIGHT COLUMN */}
      <div style={{ 
        paddingLeft: '10mm',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '5mm'
      }}>
        {careerObjective && (
          <Section title="Career Objective">
            <p style={{ fontSize: '10pt', lineHeight: 1.5 }}>{careerObjective}</p>
          </Section>
        )}

        {education.length > 0 && (
          <Section title="Education">
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '3mm' }}>
                <div style={{ fontWeight: 600, fontSize: '10pt' }}>
                  🎓 {edu.degree}
                </div>
                <div style={{ fontSize: '9pt', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{edu.institution}</span>
                  <span>{edu.year}</span>
                </div>
              </div>
            ))}
          </Section>
        )}

        {experience.length > 0 && (
          <Section title="Experience">
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '4mm' }}>
                <div style={{ fontSize: '10pt', marginBottom: '1mm' }}>
                  <span style={{ fontWeight: 600 }}>🏢 {exp.role}</span> at {exp.company}
                </div>
                <div style={{ fontSize: '9pt', fontStyle: 'italic', marginBottom: '1mm' }}>
                  {exp.duration}
                </div>
                <p style={{ fontSize: '9pt', lineHeight: 1.4, marginLeft: '4mm' }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </Section>
        )}

        {projects.length > 0 && (
          <Section title="Projects">
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '3mm' }}>
                <div style={{ fontWeight: 600, fontSize: '10pt' }}>
                  {proj.title}
                </div>
                <p style={{ fontSize: '9pt', lineHeight: 1.4 }}>
                  {proj.description}
                </p>
                {proj.link && (
                  <div style={{ fontSize: '8pt', marginTop: '1mm' }}>
                    🔗 <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ color: '#3498db' }}>
                      {proj.link.length > 30 ? proj.link.substring(0, 30) + '...' : proj.link}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </Section>
        )}

        <ListSection title="Strengths" items={strengths} />
      </div>
    </div>
  );
};

// Reusable Components with improved styles
const Section = ({ title, children }) => (
  <section style={{ marginBottom: '4mm' }}>
    <h3 style={{
      fontSize: '12pt',
      borderBottom: '1px solid #2c3e50',
      marginBottom: '3mm',
      paddingBottom: '1mm',
      color: '#2c3e50',
      fontWeight: 600,
      textTransform: 'uppercase'
    }}>
      {title}
    </h3>
    {children}
  </section>
);

const ListSection = ({ title, items }) => {
  if (!items || items.length === 0) return null;
  
  return (
    <section style={{ marginBottom: '4mm' }}>
      <h3 style={{
        fontSize: '12pt',
        borderBottom: '1px solid #2c3e50',
        marginBottom: '3mm',
        paddingBottom: '1mm',
        color: '#2c3e50',
        fontWeight: 600,
        textTransform: 'uppercase'
      }}>
        {title}
      </h3>
      <ul style={{
        margin: 0,
        paddingLeft: '4mm',
        fontSize: '9pt',
        listStyleType: 'none'
      }}>
        {items.map((item, i) => (
          <li key={i} style={{ 
            marginBottom: '1mm',
            position: 'relative',
            paddingLeft: '4mm'
          }}>
            <span style={{ 
              position: 'absolute',
              left: 0,
              color: '#2c3e50'
            }}>•</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TemplateModern;