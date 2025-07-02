import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
import './ResumeBuilder.css';
import UserMenu from './UserMenu';

function ResumeBuilder() {
  const navigate = useNavigate();
  const [hasExperience, setHasExperience] = useState('no');
  const [education, setEducation] = useState([{ degree: '', institution: '', year: '' }]);
  const [experience, setExperience] = useState([{ company: '', role: '', duration: '', description: '' }]);
  const [projects, setProjects] = useState([{ title: '', description: '', link: '' }]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    careerObjective: '',
    skills: '',
    strengths: '',
    certifications: '',
    hobbies: '',
    template: sessionStorage.getItem('selectedTemplate') || 'classic',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (i, e) => {
    const updated = [...education];
    updated[i][e.target.name] = e.target.value;
    setEducation(updated);
  };

  const handleExperienceChange = (i, e) => {
    const updated = [...experience];
    updated[i][e.target.name] = e.target.value;
    setExperience(updated);
  };

  const handleProjectChange = (i, e) => {
    const updated = [...projects];
    updated[i][e.target.name] = e.target.value;
    setProjects(updated);
  };

  const addEducation = () => setEducation([...education, { degree: '', institution: '', year: '' }]);
  const removeEducation = (i) => setEducation(education.filter((_, index) => index !== i));

  const addExperience = () => setExperience([...experience, { company: '', role: '', duration: '', description: '' }]);
  const removeExperience = (i) => setExperience(experience.filter((_, index) => index !== i));

  const addProject = () => setProjects([...projects, { title: '', description: '', link: '' }]);
  const removeProject = (i) => setProjects(projects.filter((_, index) => index !== i));

  const handleSubmit = (e) => {
    e.preventDefault();

    const resumeData = {
      ...formData,
      education,
      experience: hasExperience === 'yes' ? experience : [],
      projects,
      skills: formData.skills.split(',').map((s) => s.trim()),
      strengths: formData.strengths.split(',').map((s) => s.trim()),
      certifications: formData.certifications.split(',').map((s) => s.trim()),
      hobbies: formData.hobbies.split(',').map((s) => s.trim()),
    };

    navigate('/saveresume', {
      state: {
        formData: resumeData,
        education: resumeData.education,
        experience: resumeData.experience,
        projects: resumeData.projects,
      },
    });
  };

  return (
    <>
     <UserMenu/>
      <div className="resume-container">
        <h2 className="form-title">Build Your Resume</h2>
        <form className="resume-form" onSubmit={handleSubmit}>
          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="input-field"
          />
          <textarea
            name="careerObjective"
            placeholder="Career Objective"
            value={formData.careerObjective}
            onChange={handleChange}
            required
            className="textarea-field"
          />

          {/* Education Section */}
          <div className="section">
            <h4>Education</h4>
            {education.map((edu, i) => (
              <div key={i} className="multi-input">
                <input
                  name="degree"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(i, e)}
                  required
                  className="input-field"
                />
                <input
                  name="institution"
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(i, e)}
                  required
                  className="input-field"
                />
                <input
                  name="year"
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) => handleEducationChange(i, e)}
                  required
                  className="input-field"
                />
                {education.length > 1 && (
                  <button type="button" onClick={() => removeEducation(i)} className="remove-btn">
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addEducation} className="add-btn">
              + Add Education
            </button>
          </div>

          {/* Experience Section */}
          <div className="section">
            <h4>Do you have experience?</h4>
            <select value={hasExperience} onChange={(e) => setHasExperience(e.target.value)} className="select-field">
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {hasExperience === 'yes' && (
            <div className="section">
              <h4>Experience</h4>
              {experience.map((exp, i) => (
                <div key={i} className="multi-input">
                  <input
                    name="company"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(i, e)}
                    required
                    className="input-field"
                  />
                  <input
                    name="role"
                    placeholder="Role"
                    value={exp.role}
                    onChange={(e) => handleExperienceChange(i, e)}
                    required
                    className="input-field"
                  />
                  <input
                    name="duration"
                    placeholder="Duration"
                    value={exp.duration}
                    onChange={(e) => handleExperienceChange(i, e)}
                    required
                    className="input-field"
                  />
                  <input
                    name="description"
                    placeholder="Description"
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(i, e)}
                    required
                    className="input-field"
                  />
                  {experience.length > 1 && (
                    <button type="button" onClick={() => removeExperience(i)} className="remove-btn">
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addExperience} className="add-btn">
                + Add Experience
              </button>
            </div>
          )}

          {/* Projects Section */}
          <div className="section">
            <h4>Projects</h4>
            {projects.map((proj, i) => (
              <div key={i} className="multi-input">
                <input
                  name="title"
                  placeholder="Project Title"
                  value={proj.title}
                  onChange={(e) => handleProjectChange(i, e)}
                  required
                  className="input-field"
                />
                <input
                  name="description"
                  placeholder="Description"
                  value={proj.description}
                  onChange={(e) => handleProjectChange(i, e)}
                  required
                  className="input-field"
                />
                <input
                  name="link"
                  placeholder="Link (if any)"
                  value={proj.link}
                  onChange={(e) => handleProjectChange(i, e)}
                  className="input-field"
                />
                {projects.length > 1 && (
                  <button type="button" onClick={() => removeProject(i)} className="remove-btn">
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addProject} className="add-btn">
              + Add Project
            </button>
          </div>

          {/* Other Sections */}
          <textarea name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} className="textarea-field" />
          <textarea name="strengths" placeholder="Strengths (comma separated)" value={formData.strengths} onChange={handleChange} className="textarea-field" />
          <textarea name="certifications" placeholder="Certifications (comma separated)" value={formData.certifications} onChange={handleChange} className="textarea-field" />
          <textarea name="hobbies" placeholder="Hobbies (comma separated)" value={formData.hobbies} onChange={handleChange} className="textarea-field" />

          <button type="submit" className="submit-btn">Create Resume</button>
        </form>
      </div>
    </>
  );
}

export default ResumeBuilder;

