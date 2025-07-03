 
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CustomEditor from "./CustomEditor";
import TemplateEditor from "./ResumeEditor";
import Apis from "../Apis";

const EditRouter = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      const token = sessionStorage.getItem("token");
      const res = await axios.get(Apis.GET_RESUMES_BY_ID+`/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResume(res.data.resume);
      setLoading(false);
    };
    fetchResume();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return resume.type === "custom" ? (
    <CustomEditor existingResume={resume} />
  ) : (
    <TemplateEditor existingResume={resume} />
  );
};

export default EditRouter;
