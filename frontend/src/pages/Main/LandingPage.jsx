import { useEffect, useState } from 'react';
import EditableBlock from '../../Components/blocks/EditableBlock';
import { useApi } from '../../hooks/useApi';

const LandingPage = () => {
  const [blocks, setBlocks] = useState([]);
  const { get, error } = useApi();

  useEffect(() => {
    const loadBlocks = async () => {
      try {
        const data = await get('/blocks');
        const validBlocks = data
          .filter(block => block?.id && block?.type && block?.visible !== undefined)
          .map(block => ({
            ...block,
            type: block.type.toLowerCase(),
            content: typeof block.content === 'string' ? JSON.parse(block.content) : block.content
          }));
        setBlocks(validBlocks.filter(block => block.visible));
      } catch (error) {
        console.error('Ошибка загрузки блоков:', error);
      }
    };

    loadBlocks();
  }, [get]);

  if (error) {
    return (
      <div className="container mx-auto text-center text-red-500 py-16">
        Ошибка загрузки блоков: {error}
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {blocks.map(block => {
        const isFullWidth = block.type === 'curriculum';

        return (
          <section 
            key={block.id} 
            className={isFullWidth ? 'full-width-section' : 'container mx-auto py-8 px-4'}
          >
            <EditableBlock 
              block={block} 
              isAdminView={false} 
              onError={(error) => (
                <div className="bg-red-100 p-4 border-2 border-red-500">
                  Ошибка отображения блока: {error.message}
                </div>
              )}
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