import FooterBlockView from './components/FooterBlockView';
import FooterBlockEditor from './components/FooterBlockEditor';

const FooterBlock = ({ content = {}, isAdminView = false, setContent, editMode }) => {
  if (isAdminView && editMode) {
    return <FooterBlockEditor content={content} setContent={setContent} />;
  }
  return <FooterBlockView content={content} />;
};

export default FooterBlock; 