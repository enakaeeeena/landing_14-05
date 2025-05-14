import { useEffect, useState } from 'react';
import EditableBlock from '../../components/blocks/EditableBlock';
import { useApi } from '../../hooks/useApi';

const LandingPage = () => {
  const [blocks, setBlocks] = useState([]);
  const { get } = useApi();

  useEffect(() => {
    const loadBlocks = async () => {
      try {
        const response = await get('/api/blocks');
        if (response.ok) {
          const data = await response.json();
          const validBlocks = data
            .filter(block => block?.id && block?.type && block?.visible !== undefined)
            .map(block => ({
              ...block,
              type: block.type.toLowerCase(),
              content: typeof block.content === 'string' ? JSON.parse(block.content) : block.content
            }));
          setBlocks(validBlocks.filter(block => block.visible));
        }
      } catch (error) {
        console.error('Ошибка загрузки блоков:', error);
      }
    };

    loadBlocks();
  }, [get]);

  return (
    <div className="bg-background min-h-screen">
      {blocks.map(block => {
        const isFullWidth = block.type === 'curriculum';

        const BlockContent = (
          <EditableBlock 
            key={block.id}
            block={block} 
            isAdminView={false} 
            onError={(error) => (
              <div className="bg-red-100 p-4 border-2 border-red-500">
                Ошибка отображения блока: {error.message}
              </div>
            )}
          />
        );

        return (
          <section 
            key={block.id} 
            className={isFullWidth ? 'full-width-section' : 'container mx-auto py-8 px-4'}
          >
            <EditableBlock 
              block={block} 
              isAdminView={false} 
            />
          </section>
        );
      })}
      
      {blocks.length === 0 && (
        <div className="container mx-auto text-center text-gray-500 py-16">
          Нет доступных блоков. Добавьте первый блок через админ-панель.
        </div>
      )}
    </div>
  );
};

export default LandingPage;