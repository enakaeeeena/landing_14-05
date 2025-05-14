import { useState, useEffect } from 'react';
import { fetchFeaturedWorks } from '../api/mockSkillsPassportApi';
import GalleryBlockView from './components/GalleryBlockView';
import GalleryLoadingSkeleton from './components/GalleryLoadingSceleton';

const GalleryBlock = () => {
  const [featuredWorks, setFeaturedWorks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWorks = async () => {
      try {
        const works = await fetchFeaturedWorks();
        setFeaturedWorks(works);
      } catch (err) {
        setError('Не удалось загрузить работы. Попробуйте обновить страницу.');
      } finally {
        setIsLoading(false);
      }
    };

    loadWorks();
  }, []);

  if (error) {
    return (
      <div className="container py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container py-8">
      {isLoading ? (
        <GalleryLoadingSkeleton />
      ) : (
        <GalleryBlockView works={featuredWorks} />
      )}
    </div>
  );
};

export default GalleryBlock;