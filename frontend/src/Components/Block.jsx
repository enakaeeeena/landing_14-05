import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';

const Block = ({ block }) => {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { get } = useApi();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await get(`/api/ProgramPages/GetBlock?id=${block.id}`);
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        }
      } catch (error) {
        console.error('Ошибка загрузки блока:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [block.id]);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (!content) {
    return null;
  }

  const renderContent = () => {
    try {
      const parsedContent = JSON.parse(content.content);

      switch (content.type) {
        case 'gallery':
          return (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={parsedContent.imageUrl}
                alt={parsedContent.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold mb-2">{parsedContent.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{parsedContent.description}</p>
                <p className="text-sm text-gray-500">Автор: {parsedContent.author}</p>
              </div>
            </div>
          );

        case 'reviews':
          return (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <h3 className="font-bold text-lg">{parsedContent.author}</h3>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${
                        i < parsedContent.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-600">{parsedContent.text}</p>
            </div>
          );

        default:
          return (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-2">{content.title}</h3>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content.content }} />
            </div>
          );
      }
    } catch (error) {
      console.error('Ошибка парсинга контента:', error);
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-bold text-lg mb-2">{content.title}</h3>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content.content }} />
        </div>
      );
    }
  };

  return (
    <div className="mb-8">
      {renderContent()}
    </div>
  );
};

export default Block; 