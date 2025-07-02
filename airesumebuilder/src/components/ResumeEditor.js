import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserMenu from "../components/UserMenu";
import "../components/ResumeBuilder.css";
import Apis from "../Apis";

const TemplateEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [hasExperience, setHasExperience] = useState('no');

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get(Apis.GET_RESUMES_BY_ID+`${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.resume;
        setResume({
          ...data,
          skills: data.skills?.join(', ') || '',
          strengths: data.strengths?.join(', ') || '',
          certifications: data.certifications?.join(', ') || '',
          hobbies: data.hobbies?.join(', ') || '',
        });
        if (data.experience && data.experience.length > 0) setHasExperience('yes');
      } catch (err) {
        console.error("Error fetching resume:", err);
      }
    };
    fetchResume();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResume((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (section, i, e) => {
    const updated = [...resume[section]];
    updated[i][e.target.name] = e.target.value;
    setResume((prev) => ({ ...prev, [section]: updated }));
  };

  const addSectionItem = (section, emptyObj) => {
    setResume((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), emptyObj],
    }));
  };

  const removeSectionItem = (section, index) => {
    setResume((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const updatedData = {
        ...resume,
        experience: hasExperience === 'yes' ? resume.experience : [],
        skills: resume.skills.split(',').map(s => s.trim()),
        strengths: resume.strengths.split(',').map(s => s.trim()),
        certifications: resume.certifications.split(',').map(s => s.trim()),
        hobbies: resume.hobbies.split(',').map(s => s.trim()),
      };

      await axios.put(Apis.UPDATE_RESUME+`${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/viewresume/${id}`);
    } catch (err) {
      alert("Error updating resume: " + err.message);
    }
  };

  if (!resume) return <div>Loading...</div>;

  return (
    <>
      <UserMenu />
      <div className="resume-container">
        <h2 className="form-title">Edit Your Resume</h2>
        <form className="resume-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          {/* Personal Info */}
          <input name="fullName" placeholder="Full Name" value={resume.fullName} onChange={handleChange} className="input-field" />
          <input name="email" type="email" placeholder="Email" value={resume.email} onChange={handleChange} className="input-field" />
          <input name="phone" placeholder="Phone" value={resume.phone} onChange={handleChange} className="input-field" />
          <input name="location" placeholder="Location" value={resume.location} onChange={handleChange} className="input-field" />
          <textarea name="careerObjective" placeholder="Career Objective" value={resume.careerObjective} onChange={handleChange} className="textarea-field" />

          {/* Education */}
          <div className="section">
            <h4>Education</h4>
            {(resume.education || []).map((edu, i) => (
              <div key={i} className="multi-input">
                <input name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleArrayChange('education', i, e)} className="input-field" />
                <input name="institution" placeholder="Institution" value={edu.institution} onChange={(e) => handleArrayChange('education', i, e)} className="input-field" />
                <input name="year" placeholder="Year" value={edu.year} onChange={(e) => handleArrayChange('education', i, e)} className="input-field" />
                {resume.education.length > 1 && (
                  <button type="button" onClick={() => removeSectionItem('education', i)} className="remove-btn">Remove</button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addSectionItem('education', { degree: '', institution: '', year: '' })} className="add-btn">+ Add Education</button>
          </div>

          {/* Experience */}
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
              {(resume.experience || []).map((exp, i) => (
                <div key={i} className="multi-input">
                  <input name="company" placeholder="Company" value={exp.company} onChange={(e) => handleArrayChange('experience', i, e)} className="input-field" />
                  <input name="role" placeholder="Role" value={exp.role} onChange={(e) => handleArrayChange('experience', i, e)} className="input-field" />
                  <input name="duration" placeholder="Duration" value={exp.duration} onChange={(e) => handleArrayChange('experience', i, e)} className="input-field" />
                  <input name="description" placeholder="Description" value={exp.description} onChange={(e) => handleArrayChange('experience', i, e)} className="input-field" />
                  {resume.experience.length > 1 && (
                    <button type="button" onClick={() => removeSectionItem('experience', i)} className="remove-btn">Remove</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => addSectionItem('experience', { company: '', role: '', duration: '', description: '' })} className="add-btn">+ Add Experience</button>
            </div>
          )}

          {/* Projects */}
          <div className="section">
            <h4>Projects</h4>
            {(resume.projects || []).map((proj, i) => (
              <div key={i} className="multi-input">
                <input name="title" placeholder="Project Title" value={proj.title} onChange={(e) => handleArrayChange('projects', i, e)} className="input-field" />
                <input name="description" placeholder="Description" value={proj.description} onChange={(e) => handleArrayChange('projects', i, e)} className="input-field" />
                <input name="link" placeholder="Link (if any)" value={proj.link} onChange={(e) => handleArrayChange('projects', i, e)} className="input-field" />
                {resume.projects.length > 1 && (
                  <button type="button" onClick={() => removeSectionItem('projects', i)} className="remove-btn">Remove</button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addSectionItem('projects', { title: '', description: '', link: '' })} className="add-btn">+ Add Project</button>
          </div>

          {/* Other Sections */}
          <textarea name="skills" placeholder="Skills (comma separated)" value={resume.skills} onChange={handleChange} className="textarea-field" />
          <textarea name="strengths" placeholder="Strengths (comma separated)" value={resume.strengths} onChange={handleChange} className="textarea-field" />
          <textarea name="certifications" placeholder="Certifications (comma separated)" value={resume.certifications} onChange={handleChange} className="textarea-field" />
          <textarea name="hobbies" placeholder="Hobbies (comma separated)" value={resume.hobbies} onChange={handleChange} className="textarea-field" />

          <button type="submit" className="submit-btn">💾 Save</button>
        </form>
      </div>
    </>
  );
};

export default TemplateEditor;
