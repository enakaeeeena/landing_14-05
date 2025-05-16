import React, { useState, useEffect } from 'react';
import { worksService } from '../services/worksService';
import { useAuth } from '../contexts/AuthContext';

const GalleryBlock = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    loadWorks();
  }, []);

  const loadWorks = async () => {
    try {
      setLoading(true);
      const data = await worksService.getFeaturedWorks();
      setWorks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load works');
      console.error('Error loading works:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading gallery...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="gallery-block">
      <h2>Галерея работ</h2>
      <div className="gallery-grid">
        {works.map((work) => (
          <div key={work.id} className="work-card">
            <div className="work-image">
              <img src={work.mainPhotoUrl} alt={work.title} />
            </div>
            <div className="work-info">
              <h3>{work.title}</h3>
              <p>{work.description}</p>
              {work.skills && (
                <div className="work-skills">
                  {work.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              <div className="work-date">
                {new Date(work.publishDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryBlock; 