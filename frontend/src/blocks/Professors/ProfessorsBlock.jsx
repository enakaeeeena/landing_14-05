import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import ProfessorsCard from './components/ProfessorsCard';

const ProfessorsBlock = ({ data, isAdmin = false, onSave }) => {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { get } = useApi();

  useEffect(() => {
    const loadProfessors = async () => {
      try {
        const response = await get('/api/Professors/GetProfessors');
        if (response.ok) {
          const data = await response.json();
          setProfessors(data.slice(0, 3));
        }
      } catch (error) {
        console.error('Ошибка загрузки преподавателей:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfessors();
  }, [get]);

  const handleEditProfessor = (updatedProfessor) => {
    console.log('Updating professor:', updatedProfessor);
    const updatedProfessors = professors.map(p => 
      p.id === updatedProfessor.id ? updatedProfessor : p
    );
    setProfessors(updatedProfessors);
    
    // Создаем обновленный контент блока
    const updatedContent = {
      ...data.content,
      professors: updatedProfessors
    };

    // Вызываем onSave с обновленными данными
    if (onSave) {
      onSave({
        ...data,
        content: updatedContent
      });
    }
  };

  const handleDeleteProfessor = (professorId) => {
    const updatedProfessors = professors.filter(p => p.id !== professorId);
    setProfessors(updatedProfessors);
    
    // Создаем обновленный контент блока
    const updatedContent = {
      ...data.content,
      professors: updatedProfessors
    };

    // Вызываем onSave с обновленными данными
    if (onSave) {
      onSave({
        ...data,
        content: updatedContent
      });
    }
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="container mx-auto py-16 px-4">
      <h2 className="text-90px font-bold mb-8 text-right">Преподаватели</h2>
      
      <div className="flex justify-end gap-8 mb-12">
        {professors.map(professor => (
          <ProfessorsCard 
            key={professor.id} 
            professor={professor}
            isAdmin={isAdmin}
            onEdit={handleEditProfessor}
            onDelete={handleDeleteProfessor}
          />
        ))}
      </div>

      <div className="text-center">
        <Link 
          to="/professors"
          className="inline-block w-full max-w-2xl bg-black text-white py-4 px-8 
                     text-2xl font-bold hover:bg-gray-800 transition-colors"
        >
          Показать всех
        </Link>
      </div>
    </div>
  );
};

export default ProfessorsBlock;