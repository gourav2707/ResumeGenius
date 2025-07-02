import React from 'react';

const TemplateCreative = ({ data = {}, education = [], experience = [] }) => {
  const skills = Array.isArray(data.skills) ? data.skills : [];
  const strengths = Array.isArray(data.strengths) ? data.strengths : [];
  const certifications = Array.isArray(data.certifications) ? data.certifications : [];
  const hobbies = Array.isArray(data.hobbies) ? data.hobbies : [];
const projects = Array.isArray(data.projects) ? data.projects : [];
  // Debugging: Log data to ensure the projects are passed correctly
  console.log(data);

  if (!data.fullName) return <p style={{ color: 'red' }}>No resume data to show.</p>;

  return (
    <div
      style={{
        width: '794px',
        height: '1123',  
        display: 'flex',
        fontFamily: 'Segoe UI, sans-serif',
        color: '#1a1a1a',
        backgroundColor: '#fff',
        margin: 'auto',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
    >
       
      <aside
        style={{
          width: '30%',
          backgroundColor: '#f4f4f4',
          padding: '35px 20px',
          boxSizing: 'border-box',
          borderRight: '1px solid #ccc',
        }}
      >
        <h1 style={{ fontSize: '22px', marginBottom: '10px' }}>{data.fullName}</h1>
        <p style={{ fontSize: '13px', marginBottom: '20px' }}>
          📧 {data.email}<br />
          📞 {data.phone}<br />
          📍 {data.location}
        </p>

        <SidebarBlock title="Skills" items={skills} />
        <SidebarBlock title="Strengths" items={strengths} />
        <SidebarBlock title="Hobbies" items={hobbies} />
      </aside>

      
      <main
        style={{
          width: '70%',
          padding: '35px 25px',
          boxSizing: 'border-box',
        }}
      >
        {data.careerObjective && (
          <Section title="Career Objective">
            <p>{data.careerObjective}</p>
          </Section>
        )}

        {education.length > 0 && (
          <Section title="Education">
            {education.map((edu, i) => (
              <p key={i} style={{ marginBottom: '6px' }}>
                🎓 <strong>{edu.degree}</strong>, {edu.institution} ({edu.year})
              </p>
            ))}
          </Section>
        )}

        {experience.length > 0 && (
          <Section title="Experience">
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <p style={{ margin: 0 }} >
                  🏢 <strong>{exp.role}</strong> at {exp.company} ({exp.duration})
                </p>
                <p style={{ marginLeft: '10px' }}>{exp.description}</p>
              </div>
            ))}
          </Section>
        )}

        {projects.length > 0 && (
          <Section title="Projects">
            {projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '8px' }}>
                <strong>{proj.title}</strong>: {proj.description}
                {proj.link && (
                  <p style={{ marginTop: '2px' }}>
                    🔗 <a href={proj.link} target="_blank" rel="noopener noreferrer">{proj.link}</a>
                  </p>
                )}
              </div>
            ))}
          </Section>
        )}

        {certifications.length > 0 && (
          <Section title="Certifications">
            <ul style={ulStyle}>{certifications.map((c, i) => <li key={i}>{c}</li>)}</ul>
          </Section>
        )}
      </main>
    </div>
  );
};

 
const SidebarBlock = ({ title, items }) =>
  items.length > 0 && (
    <section style={{ marginBottom: '18px' }}>
      <h3 style={sectionHeading}>{title}</h3>
      <ul style={ulStyle}>{items.map((item, i) => <li key={i}>{item}</li>)}</ul>
    </section>
  );

 
const Section = ({ title, children }) => (
  <section style={{ marginBottom: '24px' }}>
    <h3 style={sectionHeading}>{title}</h3>
    {children}
  </section>
);

 
const sectionHeading = {
  fontSize: '15.5px',
  borderBottom: '2px solid #000',
  marginBottom: '8px',
  paddingBottom: '4px',
};

const ulStyle = {
  margin: 0,
  paddingLeft: '20px',
  fontSize: '13px',
};

export default TemplateCreative;
