 
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { FiDownload, FiEye, FiShare2, FiLock } from "react-icons/fi";
import RenderTemplate from "./RenderTemplate";
import './PublicResume.css';
import Apis from "../Apis";

const PublicResume = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const resumeRef = useRef();

  useEffect(() => {
    const fetchResume = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(Apis.PUBLIC_RESUME+`${id}`);
        setResume(res.data.resume);
      } catch (err) {
        console.error("Error fetching public resume:", err);
        setError("Resume not found or unavailable");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResume();
  }, [id]);

  const handleDownload = () => {
    if (resumeRef.current) {
       
      const element = resumeRef.current;
      element.classList.add('generating-pdf');
      
      html2pdf().from(element).set({
        margin: 0.5,
        filename: `${resume?.fullName || 'Resume'}_${new Date().toISOString().split('T')[0]}.pdf`,
        html2canvas: { 
          scale: 2,
          logging: true,
          useCORS: true
        },
        jsPDF: { 
          unit: "in", 
          format: "letter", 
          orientation: "portrait" 
        },
      }).save().then(() => {
        element.classList.remove('generating-pdf');
      });
    }
  };

  if (isLoading) {
    return (
      <div className="public-resume-loading">
        <div className="loading-spinner"></div>
        <p>Loading resume...</p>
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="public-resume-error">
        <FiLock className="error-icon" />
        <h3>Resume Unavailable</h3>
        <p>{error || "The requested resume cannot be displayed"}</p>
        
      </div>
    );
  }

  return (
    <div className="public-resume-container">
      
       
          <p className="text-muted">This is a read-only public view. You can download this resume as a PDF.</p>

      <main className="public-resume-main">
        <div className="resume-actions">
          <button 
            onClick={handleDownload}
            className="download-button "
            disabled={isLoading}
          >
            <FiDownload className="button-icon" />
            Download PDF
          </button>
          
          
        </div>

        <div className="resume-preview-container">
          <div 
            ref={resumeRef}
            className="resume-template-wrapper"
          >
            <RenderTemplate
              template={resume.template}
              resume={resume}
              isPublicView={true}
            />
          </div>
        </div>

        
      </main>
    </div>
  );
};

export default PublicResume;
