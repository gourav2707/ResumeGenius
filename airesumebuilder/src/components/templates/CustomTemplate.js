// client/src/components/templates/CustomTemplate.jsx
import React from 'react';

const CustomTemplate = ({ content }) => {
  return (
    <div
      style={{
        width: '794px',
        height: '1123px',
        margin: 'auto',
        border: '1px solid #ccc',
        position: 'relative',
        background: '#fff',
        
      }}
    >
      {content?.map((field) => (
        <div
          key={field.id}
          style={{
            position: 'absolute',
            left: field.x,
            top: field.y,
            width: field.width,
            height: field.height,
            ...field.styles,
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word',
          }}
        >
          {field.content}
        </div>
      ))}
    </div>
  );
};

export default CustomTemplate;
