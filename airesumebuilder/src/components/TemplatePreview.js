import React from "react";
import TemplateClassic from "./templates/TemplateClassic";
import TemplateModern from "./templates/TemplateModern";
import TemplateCreative from "./templates/TemplateCreative";
import TemplateATS from "./templates/TemplateATS";
import demoData from "./demoData";
 
import { useNavigate } from "react-router-dom";
import './TemplatePreview.css';
 
// Import images
import atsImage from '../images/ats.png'; // Adjust the file name and path
import classicImage from '../images/classic.png';
import modernImage from '../images/modern.png';
import creativeImage from '../images/creative.png';
import UserMenu from "./UserMenu";

function TemplatePreview() {
  const navigate = useNavigate();

  // Template configuration data
  const templates = [
    {
      id: "ats",
      name: "ATS-Friendly",
      component: TemplateATS,
      image: atsImage, // Use the imported image here
    },
    {
      id: "classic",
      name: "Classic",
      component: TemplateClassic,
      image: classicImage, // Use the imported image here
    },
    {
      id: "modern",
      name: "Modern",
      component: TemplateModern,
      image: modernImage, // Use the imported image here
    },
    {
      id: "creative",
      name: "Creative",
      component: TemplateCreative,
      image: creativeImage, // Use the imported image here
    }
  ];

  const handleUseTemplate = (templateId) => {
    sessionStorage.setItem("selectedTemplate", templateId);
    navigate("/buildresume");
  };

  return (
    <>
      <UserMenu/>
         
      <div className="template-container">
        
        <h2 className="template-title">Choose Your Resume Template</h2> 
        <p className="template-subtitle">Select a design that matches your professional style</p>

        <div className="template-gallery">
          {templates.map((template) => {
            const TemplateComponent = template.component;
            return (
              <div key={template.id} className="template-card-container">
                <div className="template-card">
                  <h4>{template.name}</h4>
                  <div className="template-preview">
                    <img src={template.image} alt={`${template.name} Preview`} className="template-image" />
                  </div>
                  <div className="template-action">
                    <button 
                      className="use-btn" 
                      onClick={() => handleUseTemplate(template.id)}
                    >
                      Use This Template
                    </button>
                  </div>
                  
                </div>
              </div>
              
            );
          })}
        </div>
        
      </div>
          
    </>
  );
}

export default TemplatePreview;
 