import React from "react";
import TemplateClassic from "./templates/TemplateClassic";
import TemplateModern from "./templates/TemplateModern";
import TemplateCreative from "./templates/TemplateCreative";
import TemplateATS from "./templates/TemplateATS";
import CustomTemplate from "./templates/CustomTemplate";  

const RenderTemplate = ({ template, resume }) => {
  switch (template?.toLowerCase()) {
    case "classic":
      return <TemplateClassic data={resume} />;
    case "modern":
      return <TemplateModern data={resume} />;
    case "creative":
      return <TemplateCreative data={resume} />;
    case "ats":
      return <TemplateATS data={resume} />;
    case "custom":
      return <CustomTemplate content={resume.customContent} />;
    default:
      return <div className="text-danger"> Invalid template</div>;
  }
};

export default RenderTemplate;
