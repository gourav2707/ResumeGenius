 
import React, { useRef, useEffect, useState } from 'react';
import DraggableField from './DraggableField';
import Canvas from './Canvas';
import { FIELD_TYPES } from './FieldTypes';
import demoData from './demoData';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import UserMenu from './UserMenu';
import './CustomEditor.css';
import Apis from '../Apis';

const generateFieldsFromData = (data) => {
  const fields = [];
  let y = 30;

  const addField = (text, type = FIELD_TYPES.TEXT, style = {}) => {
    const estimatedHeight =
      type === FIELD_TYPES.LINE
        ? 2
        : text.length > 200
        ? 100
        : text.length > 100
        ? 60
        : 40;

    fields.push({
      id: Date.now() + Math.random(),
      type,
      x: 40,
      y,
      width: 600,
      height: estimatedHeight,
      content: text,
      styles: {
        fontSize: '14px',
        textAlign: 'left',
        ...style,
      },
    });
    y += estimatedHeight + 2;
  };

  const headingStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'left',
  };

  if (!data) return fields;

  addField(data.fullName || '', FIELD_TYPES.HEADING, {
    fontSize: '26px',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  });

  addField(`${data.email || ''} | ${data.phone || ''} | ${data.location || ''}`);
  addField('Profile Summary', FIELD_TYPES.HEADING, headingStyle);
  addField(data.careerObjective || '');

  addField('Education', FIELD_TYPES.HEADING, headingStyle);
  (data.education || []).forEach((edu) =>
    addField(`${edu.degree} at ${edu.institution} (${edu.year})`)
  );

  addField('Experience', FIELD_TYPES.HEADING, headingStyle);
  (data.experience || []).forEach((exp) => {
    addField(`${exp.role} at ${exp.company} (${exp.duration})`);
    addField(exp.description || '');
  });

  addField('Projects', FIELD_TYPES.HEADING, headingStyle);
  (data.projects || []).forEach((p) =>
    addField(`${p.title}: ${p.description} (${p.link})`)
  );

  addField('Skills', FIELD_TYPES.HEADING, headingStyle);
  addField((data.skills || []).join(', '));

  addField('Strengths', FIELD_TYPES.HEADING, headingStyle);
  addField((data.strengths || []).join(', '));

  addField('Certifications', FIELD_TYPES.HEADING, headingStyle);
  addField((data.certifications || []).join(', '));

  addField('Hobbies', FIELD_TYPES.HEADING, headingStyle);
  addField((data.hobbies || []).join(', '));

  return fields;
};

const CustomEditor = () => {
  const canvasRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialFields, setInitialFields] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      if (!id) {
        setInitialFields(generateFieldsFromData(demoData));
        return;
      }

      setEditMode(true);
      try {
        const token = sessionStorage.getItem('token');
        const res = await axios.get(Apis.GET_RESUMES_BY_ID+`${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const resume = res.data.resume;
        if (resume.template === 'custom' && resume.customContent) {
          setInitialFields(resume.customContent);
        } else {
          setInitialFields(generateFieldsFromData(resume));
        }
      } catch (err) {
        alert('Error loading resume: ' + err.message);
      }
    };

    fetchResume();
  }, [id]);

  const handleSave = async () => {
    const customFields = canvasRef.current.getFields();

    if (customFields.length === 0) {
      const confirmSave = window.confirm("Canvas is empty. Do you still want to save?");
      if (!confirmSave) return;
    }

    let fullName = '';
    let email = '';
    for (let field of customFields) {
      if (!fullName && field.type === FIELD_TYPES.HEADING) {
        fullName = field.content.trim();
      }
      if (!email && field.content.includes('@')) {
        const parts = field.content.split(/[|,\s]/);
        for (let p of parts) {
          if (p.includes('@')) {
            email = p.trim();
            break;
          }
        }
      }
      if (fullName && email) break;
    }

    const payload = {
      template: 'custom',
      customContent: customFields,
      fullName,
      email,
    };

    try {
      const token = sessionStorage.getItem('token');
      const url = id
        ? Apis.UPDATE_RESUME+`${id}`
        : Apis.CREATE_RESUME;
      const method = id ? 'put' : 'post';

      const res = await axios({
        method,
        url,
        data: payload,
        headers: { Authorization: `Bearer ${token}` },
      });

      const resumeId = res.data.resume?._id;
      if (resumeId) navigate(`/viewresume/${resumeId}`);
    } catch (err) {
      alert("Error saving resume: " + err.message);
    }
  };

  return (
    <>
      <UserMenu />
      <div className="flex w-full h-screen">
        <div className="w-1/5 bg-gray-100 p-4 border-r overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Add Elements</h2>
          <DraggableField type={FIELD_TYPES.HEADING} label="Heading" icon="H" />
          <DraggableField type={FIELD_TYPES.SUBHEADING} label="Subheading" icon="S" />
          <DraggableField type={FIELD_TYPES.TEXT} label="Text" icon="T" />
          <DraggableField type={FIELD_TYPES.BULLET} label="Bullet" icon="•" />
          <DraggableField type={FIELD_TYPES.LINE} label="Line" icon="―" />

          <button
            onClick={handleSave}
            className="save-button"
          >
            {editMode ? 'Update Resume' : 'Save Resume'}
          </button>
        </div>

        <div className="flex flex-col flex-1 bg-white">
          <Canvas ref={canvasRef} initialFields={initialFields} />
        </div>
      </div>
    </>
  );
};

export default CustomEditor;
