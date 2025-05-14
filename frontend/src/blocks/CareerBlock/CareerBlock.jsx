import { CareerBlockView } from './components/CareerBlockView';
import { CareerEditor } from './components/CareerEditor';

const CareerBlock = ({ content, setContent, isEdit }) => {
  if (isEdit) {
    return <CareerEditor content={content} setContent={setContent} />;
  }
  return <CareerBlockView content={content} />;
};

export default CareerBlock; 