import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TemplateClassic from './templates/TemplateClassic';
import TemplateModern from './templates/TemplateModern';
import TemplateCreative from './templates/TemplateCreative';
import TemplateATS from './templates/TemplateATS';
import './SaveResume.css';
import UserMenu from './UserMenu';
import Apis from '../Apis';

const templateMap = {
  classic: TemplateClassic,
  modern: TemplateModern,
  creative: TemplateCreative,
  ats: TemplateATS,
};

function SaveResume() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const { formData, education, experience, projects } = state || {};
  const SelectedTemplate = templateMap[formData?.template || 'classic'];

  const fullResumeData = {
    ...formData,
    education,
    experience,
    projects,
  };

  const handleSave = async () => {
    try {
      const res = await axios.post(Apis.CREATE_RESUME, fullResumeData);
      console.log(res);
      if ((res.status === 201 || res.status === 200) && res.data.resume && res.data.resume._id) {
        const resumeId = res.data.resume._id;
        setMessage('✅ Resume saved successfully!');
        setTimeout(() => {
          navigate(`/viewresume/${resumeId}`);
        }, 1500);
      } else {
        setMessage('❌ Failed to save resume.');
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Error while saving.');
    }
  };

  return (
    <> 
    <UserMenu/>
    <div  >
      <h2 className="saveresume-container">Preview Your Resume</h2>
      <SelectedTemplate
        data={{
          ...formData,
          education,
          experience,
          projects,
        }}
      />

      <button className="save-btn" onClick={handleSave}>
        Save Resume
      </button>

      {message && <p>{message}</p>}
    </div>
 </> );
}

export default SaveResume;
