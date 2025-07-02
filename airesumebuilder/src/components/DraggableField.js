// // src/components/DraggableField.js
// import { useDrag } from 'react-dnd';

// const DraggableField = ({ type, label }) => {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: 'field',
//     item: { type },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   }));

//   return (
//     <div
//       ref={drag}
//       style={{
//         opacity: isDragging ? 0.4 : 1,
//         cursor: 'grab',
//         background: '#fff',
//         border: '1px solid #ccc',
//         padding: '8px',
//         marginBottom: '8px',
//       }}
//     >
//       {label}
//     </div>
//   );
// };

// export default DraggableField;
import { useDrag } from 'react-dnd';

const DraggableField = ({ type, label, icon }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'field',
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.4 : 1,
        cursor: 'grab',
        background: '#fff',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '8px 10px',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '14px',
        fontWeight: 500
      }}
    >
      {icon && (
        <div
          style={{
            width: '20px',
            height: '20px',
            fontSize: '16px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          {icon}
        </div>
      )}
      <span>{label}</span>
    </div>
  );
};

export default DraggableField;
