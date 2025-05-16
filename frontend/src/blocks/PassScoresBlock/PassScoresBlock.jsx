import { useState } from 'react';
import PassScoresBlockView from './components/PassScoresBlockView';
import PassScoresBlockEditor from './components/PassScoresBlockEditor';

const PassScoresBlock = ({ content = {}, isAdminView = false, onSave }) => {
  const [editMode, setEditMode] = useState(false);

  if (isAdminView && editMode) {
    return <PassScoresBlockEditor content={content} onSave={onSave} onCancel={() => setEditMode(false)} />;
  }

  return <PassScoresBlockView content={content} onEdit={isAdminView ? () => setEditMode(true) : undefined} />;
};

export default PassScoresBlock; 