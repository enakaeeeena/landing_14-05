import { useEffect, useState } from 'react';
import { fetchAdmissionData } from '../../api/fakeDb';
import AdmissionBlockView from './components/AdmissionBlockView';

const AdmissionBlock = ({ data }) => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdmissionData().then(data => {
      setContent(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return <AdmissionBlockView content={content} />;
};

export default AdmissionBlock;