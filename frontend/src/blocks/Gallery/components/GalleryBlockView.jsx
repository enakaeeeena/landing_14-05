import React, { useEffect, useState } from 'react';
import { worksService } from '../../../../services/worksService';

export const GalleryBlockView = ({ content }) => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWorks = async () => {
      try {
        const data = await worksService.getWorks({ isFeatured: true });
        setWorks(data);
        setLoading(false);
      } catch (err) {
        setError('Ошибка при загрузке работ');
        setLoading(false);
      }
    };

    loadWorks();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Галерея работ</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map((work) => (
          <div key={work.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {work.image && (
              <img
                src={work.image}
                alt={work.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{work.title}</h3>
              <p className="text-gray-600">{work.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 