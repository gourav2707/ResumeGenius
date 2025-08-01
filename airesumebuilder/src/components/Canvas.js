 
import { useDrop } from 'react-dnd';
import { Rnd }     from 'react-rnd';
import {
  useState, useEffect, forwardRef, useImperativeHandle
} from 'react';

import { FIELD_TYPES } from './FieldTypes';
import Toolbar         from './Toolbar';

const Canvas = forwardRef(({ initialFields = [] }, ref) => {
  
  const [fields,      setFields]   = useState([]);
  const [selectedId,  setSelected] = useState(null);

 
  useImperativeHandle(ref, () => ({
    getFields:     () => fields,
    getCanvasSize: () => ({ width: 794, height: 1123 })
  }));

   
  useEffect(() => {
    const uniq = [];
    const data = (initialFields ?? []).map(block => {
      const id = block.id && !uniq.includes(block.id)
        ? block.id
        : crypto.randomUUID();
      uniq.push(id);
      return { ...block, id };
    });
    setFields(data);
  }, [initialFields]);

   
  const [, drop] = useDrop(() => ({
    accept: 'field',
    drop:  (item, monitor) => {
      const offset = monitor.getClientOffset();
      const canvas = document.getElementById('canvas');
      const rect   = canvas.getBoundingClientRect();
      const x = Math.max(0, offset.x - rect.left);
      const y = Math.max(0, offset.y - rect.top);

      const base = {
        fontFamily: `'Helvetica Neue', Arial, sans-serif`,
        color:      '#333',
        lineHeight: 1 ,
        padding:    '1px',
        boxSizing:  'border-box'
      };

      setFields(prev => [
        ...prev,
        {
          id:  crypto.randomUUID(),
          type:item.type,
          x, y,
          width:  item.type === FIELD_TYPES.LINE ? 300 : 280,
          height: item.type === FIELD_TYPES.LINE ? 1   : 30,
          content: defaultContent(item.type),
          styles:  { ...base, ...typeStyles(item.type) }
        }
      ]);
    }
  }), []);

   
  const defaultContent = (t) => ({
    [FIELD_TYPES.HEADING]    : 'SECTION HEADING',
    [FIELD_TYPES.SUBHEADING] : 'Sub-heading',
    [FIELD_TYPES.BULLET]     : '• ',
    [FIELD_TYPES.TEXT]       : 'Your text here …',
    [FIELD_TYPES.LINE]       : ''
  }[t] ?? 'Content');

  const typeStyles = (t) => {
    switch (t) {
      case FIELD_TYPES.HEADING:    return { fontSize:'18px', fontWeight:'700', textTransform:'uppercase' };
      case FIELD_TYPES.SUBHEADING: return { fontSize:'15px', fontWeight:'600', color:'#2c3e50' };
      case FIELD_TYPES.TEXT:       return { fontSize:'12px' };
      case FIELD_TYPES.BULLET:     return { fontSize:'20px', paddingLeft:'18px', textIndent:'-10px' };
      case FIELD_TYPES.LINE:       return { background:'#000', height:'1px' };
      default:                     return {};
    }
  };

 
  const toggleStyle = (key, value) => {
    setFields(fs => fs.map(f => f.id === selectedId
      ? { ...f, styles:{ ...f.styles, [key]: f.styles[key] === value ? resetVal(key) : value } }
      : f));
  };
  const resetVal = (k) => ({ fontWeight:'normal', fontStyle:'normal', textAlign:'left' }[k] ?? '');

  const deleteBlock = () => {
    setFields(fs => fs.filter(f => f.id !== selectedId));
    setSelected(null);
  };

 
  return (
    <>
      <Toolbar
        selectedField={fields.find(f => f.id === selectedId)}
        onStyleChange={toggleStyle}
        onDelete={deleteBlock}
      />

      <div
        id="canvas"
        ref={drop}
        onClick={() => setSelected(null)}
        style={{
          width: 794, height: 1123, margin:'auto',
          border:'1px solid #ddd', position:'relative', background:'#fff'
        }}
      >
        {fields.map(field => (
          <Rnd
            key={field.id}
            bounds="parent"
            position={{ x: field.x, y: field.y }}
            size={{ width: field.width, height: field.height }}
            minWidth={field.type === FIELD_TYPES.LINE ? 50 : 100}
            minHeight={field.type === FIELD_TYPES.LINE ? 2  : 20}
            enableResizing={
              field.type === FIELD_TYPES.LINE
                ? { left:true, right:true }         // only horizontal resize
                : true
            }
            onDragStop={(e,d) =>
              setFields(fs => fs.map(f => f.id===field.id ? { ...f, x:d.x, y:d.y } : f))
            }
            onResizeStop={(e,dir,ref,delta,pos) =>
              setFields(fs => fs.map(f => f.id===field.id ? {
                ...f,
                width : parseInt(ref.style.width),
                height: field.type === FIELD_TYPES.LINE ? 2 : parseInt(ref.style.height),
                x: pos.x, y: pos.y
              } : f))
            }
            style={{
              border: selectedId===field.id ? '2px solid #007bff':'1px dashed transparent',
              zIndex: selectedId===field.id ? 100:1
            }}
          >
            {field.type === FIELD_TYPES.LINE ? (
              <div
                style={{ height:'100%', width:'100%', background:field.styles.background }}
                onClick={e => { e.stopPropagation(); setSelected(field.id); }}
              />
            ) : (
              <div
                contentEditable
                suppressContentEditableWarning
                dangerouslySetInnerHTML={{ __html: field.content }}
                style={{ ...field.styles, width:'100%', height:'100%', outline:'none' }}
                onClick={e => { e.stopPropagation(); setSelected(field.id); }}
                onBlur ={e =>
                  setFields(fs => fs.map(f => f.id===field.id ? { ...f, content:e.target.innerHTML } : f))
                }
              />
            )}
          </Rnd>
        ))}
      </div>
    </>
  );
});

export default Canvas;
