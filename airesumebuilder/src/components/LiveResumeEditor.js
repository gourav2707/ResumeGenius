import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './LiveResumeEditor.css';

const initialBlocks = [
  { id: 'summary', label: 'Profile Summary', content: 'Your professional summary here...' },
  { id: 'skills', label: 'Skills', content: '• JavaScript\n• React\n• Node.js\n• MongoDB' },
  { id: 'projects', label: 'Projects', content: '• Project A\n• Project B' },
  { id: 'experience', label: 'Experience', content: '• Company A\n• Company B' },
];

function LiveResumeEditor() {
  const [blocks, setBlocks] = useState(initialBlocks);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = blocks.findIndex(b => b.id === active.id);
      const newIndex = blocks.findIndex(b => b.id === over.id);
      setBlocks(arrayMove(blocks, oldIndex, newIndex));
    }
  };

  const updateBlockContent = (id, newContent) => {
    setBlocks((prev) =>
      prev.map((block) => block.id === id ? { ...block, content: newContent } : block)
    );
  };

  return (
    <div className="live-editor-container">
      <h2>Visual Resume Editor</h2>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
          {blocks.map((block) => (
            <SortableBlock key={block.id} block={block} onContentChange={updateBlockContent} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableBlock({ block, onContentChange }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} className="resume-block" style={style}>
      <strong>{block.label}</strong>
      <div
        className="editable"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onContentChange(block.id, e.target.innerText)}
      >
        {block.content}
      </div>
    </div>
  );
}

export default LiveResumeEditor;
