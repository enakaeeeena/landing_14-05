import { useState } from 'react';
import MinScoresBlockView from './components/MinScoresBlockView';
import MinScoresBlockEditor from './components/MinScoresBlockEditor';

const MinScoresBlock = ({ content = {}, isAdminView = false, onSave }) => {
  const [editMode, setEditMode] = useState(false);

  if (isAdminView && editMode) {
    return <MinScoresBlockEditor content={content} onSave={onSave} onCancel={() => setEditMode(false)} />;
  }

  return <MinScoresBlockView content={content} onEdit={isAdminView ? () => setEditMode(true) : undefined} />;
};

export default MinScoresBlock; 