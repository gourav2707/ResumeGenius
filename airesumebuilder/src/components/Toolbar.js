import React from 'react';
import { FaBold, FaItalic, FaAlignLeft, FaAlignCenter, FaAlignRight, FaTrash } from 'react-icons/fa';
import './Toolbar.css';
const Toolbar = ({ onStyleChange, onDelete }) => {
  return (
    <div style={{
      padding: '12px 16px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #eaeaea',
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      borderRadius: '8px 8px 0 0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }}>
      <span style={{ 
        fontWeight: '600',
        color: '#555',
        fontSize: '14px',
        marginRight: '8px'
      }}>Text Formatting:</span>

      <select 
        onChange={(e) => onStyleChange('fontSize', e.target.value)}
        style={{
          padding: '8px 12px',
          borderRadius: '6px',
          border: '1px solid #ddd',
          backgroundColor: '#fff',
          color: '#333',
          fontSize: '14px',
          cursor: 'pointer',
          outline: 'none',
          transition: 'all 0.2s',
          ':hover': {
            borderColor: '#4361ee'
          }
        }}
      >
        <option value="">Font Size</option>
        <option value="12px">Small (12px)</option>
        <option value="14px">Regular (14px)</option>
        <option value="18px">Large (18px)</option>
        <option value="24px">Extra Large (24px)</option>
      </select>

      <button 
        onClick={() => onStyleChange('fontWeight', 'bold')}
        className="toolbar-button"
        aria-label="Bold"
      >
        <FaBold />
      </button>
      
      <button 
        onClick={() => onStyleChange('fontStyle', 'italic')}
        className="toolbar-button"
        aria-label="Italic"
      >
        <FaItalic />
      </button>
      
      <div style={{ display: 'flex', gap: '1px', background: '#eaeaea', borderRadius: '6px' }}>
        <button 
          onClick={() => onStyleChange('textAlign', 'left')}
          className="toolbar-button grouped-first"
          aria-label="Align Left"
        >
          <FaAlignLeft />
        </button>
        <button 
          onClick={() => onStyleChange('textAlign', 'center')}
          className="toolbar-button grouped-middle"
          aria-label="Align Center"
        >
          <FaAlignCenter />
        </button>
        <button 
          onClick={() => onStyleChange('textAlign', 'right')}
          className="toolbar-button grouped-last"
          aria-label="Align Right"
        >
          <FaAlignRight />
        </button>
      </div>
      
      <button 
        onClick={onDelete}
        style={{ 
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 12px',
          backgroundColor: '#fff0f0',
          color: '#d11a2a',
          border: '1px solid #ffd6d6',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          fontSize: '14px',
          ':hover': {
            backgroundColor: '#ffecec'
          }
        }}
        aria-label="Delete Selected"
      >
        <FaTrash /> Delete
      </button>
    </div>
  );
};

 

 

export default Toolbar;