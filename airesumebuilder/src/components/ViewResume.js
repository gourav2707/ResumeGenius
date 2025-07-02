// client/src/pages/ViewResume.jsx

import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import html2pdf from "html2pdf.js";
import RenderTemplate from "../components/RenderTemplate";
   
import "./ViewResume.css";
import UserMenu from "./UserMenu";
import Apis from "../Apis";

const ViewResume = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const resumeRef = useRef();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
 const [error, setError] = useState("");
  useEffect(() => {
    const fetchResume = async (resumeId) => {
      try {
        console.log("Fetching resume with ID:", resumeId);
        const token = sessionStorage.getItem("token");

        const res = await axios.get(Apis.GET_RESUMES_BY_ID+`${resumeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
console.log("Fetched resume:", res.data.resume);

        if (res.data.resume) {
          setResume(res.data.resume);
        } else {
          setError("Resume not found.");
        }
      } catch (err) {
        console.error("Error fetching resume:", err);
        setError("Error fetching resume. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchResume(id);
  }, [id]);
 
  const handleCopyLink = () => {
    const link = `${window.location.origin}/resume/public/${resume?._id}`;
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard:\n" + link);
  };
  const handleDownload = () => {
    if (resumeRef.current) {
      html2pdf()
        .from(resumeRef.current)
        .set({
          filename: `Resume_${resume?.fullName || "Download"}.pdf`,
          margin: 0,
          html2canvas: { scale: 2 },
          jsPDF: { format: "a4", orientation: "portrait" },
        })
        .save();
    }
  };

  if (loading) {<> 
   <UserMenu/>
    return <div className="text-center mt-5">Loading...</div>;
  </>}

  if (!resume) {
    return  <>
     <UserMenu/>
     <div className="text-center mt-5 text-danger">Resume not found.</div>;
  </>}

  return (
    <>
       <UserMenu/>
      <div className="container mt-4">
        

        <div ref={resumeRef} className="p-3 bg-white resume">
          <RenderTemplate template={resume.template} resume={resume} />
        </div>

        <div className="mt-4 d-flex gap-3">
          <button className="back-buttonn" onClick={() => navigate("/dashboard")}>
            ← Back to Dashboard
          </button>
          <button className="downlord-button" onClick={handleDownload}>
            Download PDF
          </button>
           <button className="copy-link" onClick={handleCopyLink}>
                Copy Shareable Link
              </button>
        </div>
      </div>
    </>
  );
};

export default ViewResume;
