import React from "react";

const TemplateClassic = ({ data = {} }) => {
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
        width: "794px",
        height: "1123px",
        display: "grid",
        gridTemplateColumns: "30% 70%",
        padding: "30px",
        boxSizing: "border-box",
        fontFamily: "Georgia, serif",
        fontSize: "13.5px",
        color: "#1a1a1a",
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        gap: "24px",
        margin: "auto",
        overflowY: "auto",
        lineHeight: "1.4",
      }}
    >
      {/* Left Sidebar */}
      <div>
        <h2 style={{ margin: "0 0 8px", fontSize: "22px" }}>{fullName}</h2>
        <p style={{ margin: "3px 0" }}><strong>Email:</strong> {email}</p>
        <p style={{ margin: "3px 0" }}><strong>Phone:</strong> {phone}</p>
        <p style={{ margin: "3px 0 15px" }}><strong>Location:</strong> {location}</p>

        <SidebarSection title="Skills" items={skills} />
        <SidebarSection title="Certifications" items={certifications} />
        <SidebarSection title="Hobbies" items={hobbies} />
      </div>

      {/* Right Main Content */}
      <div>
        {careerObjective && (
          <MainSection title="Career Objective">
            <p>{careerObjective}</p>
          </MainSection>
        )}

        <MainSection title="Education">
          {education.map((edu, i) => (
            <p key={i}><strong>{edu.degree}</strong>, {edu.institution} ({edu.year})</p>
          ))}
        </MainSection>

        <MainSection title="Experience">
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <strong>{exp.role}</strong> at {exp.company} ({exp.duration})
              <p>{exp.description}</p>
            </div>
          ))}
        </MainSection>

        <MainSection title="Projects">
          {projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: "6px" }}>
              <strong>{proj.title}</strong>: {proj.description}
              {proj.link && (
                <p><a href={proj.link} target="_blank" rel="noopener noreferrer">{proj.link}</a></p>
              )}
            </div>
          ))}
        </MainSection>

        <MainSection title="Strengths">
          <ul style={ulStyle}>
            {strengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </MainSection>
      </div>
    </div>
  );
};

// Sidebar reusable
const SidebarSection = ({ title, items }) =>
  items.length > 0 ? (
    <section style={{ marginBottom: "16px" }}>
      <h3 style={sectionTitle}>{title}</h3>
      <ul style={ulStyle}>{items.map((item, i) => <li key={i}>{item}</li>)}</ul>
    </section>
  ) : null;

// Main content reusable
const MainSection = ({ title, children }) => (
  <section style={{ marginBottom: "16px" }}>
    <h3 style={sectionTitle}>{title}</h3>
    {children}
  </section>
);

// Shared styles
const sectionTitle = {
  fontSize: "15px",
  marginBottom: "4px",
  borderBottom: "1px solid #ccc",
  paddingBottom: "2px",
};

const ulStyle = {
  margin: 0,
  paddingLeft: "18px",
};

export default TemplateClassic;
