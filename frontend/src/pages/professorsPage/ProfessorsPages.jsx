import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import ProfessorsCard from '../../blocks/Professors/components/ProfessorsCard';

const ProfessorsPage = () => {
  const [professors, setProfessors] = useState([]);
  const [blockTitle, setBlockTitle] = useState('Преподаватели');
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { get } = useApi();

  useEffect(() => {
    const loadProfessors = async () => {
      try {
        const response = await get('/api/Professors/GetProfessors');
        if (response.ok) {
          const data = await response.json();
          setProfessors(data);
        }
      } catch (error) {
        console.error('Ошибка загрузки преподавателей:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfessors();
  }, [get]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="relative mb-8">
        <h2 className="text-90px font-bold text-right relative pr-8">
          <div className="relative inline-block">
            <span className="relative z-10 bg-white pl-8">
              {blockTitle}
            </span>
            <span 
              className="absolute right-full top-1/2 w-screen h-1 bg-black transform -translate-y-1/2"
              style={{ left: '-50vw' }}
            ></span>
          </div>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {professors.map(professor => (
          <ProfessorsCard 
            key={professor.id} 
            professor={professor} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProfessorsPage;