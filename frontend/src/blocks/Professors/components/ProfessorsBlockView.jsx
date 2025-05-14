// src/blocks/Professors/components/ProfessorsBlockView.jsx
import { Link } from 'react-router-dom';
import ProfessorsCard from './ProfessorsCard';

export const ProfessorsBlockView = ({ content = {} }) => {
    const professors = (content.professors || [])
      .filter(p => p.favorite)
      .slice(0, 3);
  
    return (
      <div className="container mx-auto py-16 px-4 relative">
   
        <div className="relative mb-12 overflow-hidden">
          <h2 className="text-90px font-bold text-right relative pr-4">
            <span className="relative inline-block bg-white pl-8 z-10">
              {content.blockTitle || 'Преподаватели'}
            </span>
            <span 
              className="absolute right-full top-1/2 w-[200vw] h-1 bg-black transform -translate-y-1/2"
              style={{ left: '-100vw' }}
            ></span>
          </h2>
        </div>
  
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {professors.map(professor => (
            <ProfessorsCard 
              key={professor.id} 
              professor={professor} 
            />
          ))}
        </div>
  
  
        <div className="text-center">
          <Link 
            to="/professors"
            className="inline-block w-full bg-black text-white py-3 px-6 
                       text-lg font-bold hover:bg-gray-800 transition-colors border-3 border-black"
          >
            {content.buttonText || 'Показать всех'}
          </Link>
        </div>
      </div>
    );
  };