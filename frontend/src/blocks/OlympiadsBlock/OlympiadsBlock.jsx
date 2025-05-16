import { useEffect } from 'react';
import OlympiadsBlockView from './components/OlympiadsBlockView';
import OlympiadsBlockEditor from './components/OlympiadsBlockEditor';

const OlympiadsBlock = ({ content = {}, isAdminView = false, setContent, editMode, setEditMode }) => {


  if (isAdminView && editMode) {
    return (
      <OlympiadsBlockEditor
        content={content}
        setContent={setContent}
      />
    );
  }

  return <OlympiadsBlockView content={content} />;
};

export default OlympiadsBlock; 