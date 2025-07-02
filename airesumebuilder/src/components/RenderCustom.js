import React from "react";

const RenderCustom = ({ fields = [] }) => {
  return (
    <div
      style={{
        width: "794px",
        height: "1123px",
        margin: "auto",
        border: "1px solid #ccc",
        background: "#fff",
        position: "relative",
        padding: "10px",
      }}
    >
      {fields.map((field) => (
        <div
          key={field.id}
          style={{
            position: "absolute",
            top: field.y,
            left: field.x,
            width: field.width,
            height: field.height,
            ...field.styles,
            overflow: "hidden",
            padding: "2px",
          }}
        >
          {field.type === "line" ? (
            <div
              style={{
                height: "2px",
                width: "100%",
                backgroundColor: field.styles?.backgroundColor || "#000",
              }}
            />
          ) : (
            field.content
          )}
        </div>
      ))}
    </div>
  );
};

export default RenderCustom;
