import { useAdmin } from '../admin/context/AdminContext'; 
import { useEffect, useState } from 'react';
import EditableBlock from '../../Components/blocks/EditableBlock';
import { FiPlus, FiUsers, FiLayout, FiImage, FiMessageSquare, FiMenu, FiSettings } from 'react-icons/fi';
import BlockTypeModal from '../admin/components/BlockTypeModal';
import { useApi } from '../../hooks/useApi';
import { Link, useLocation } from 'react-router-dom';
import HeaderEditor from '../admin/components/HeaderEditor';

const AdminPanel = ({ headerLinks, setHeaderLinks }) => {
  const { isAdmin, isSuperAdmin } = useAdmin();
  const [blocks, setBlocks] = useState([]);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeaderEditor, setShowHeaderEditor] = useState(false);
  const { get, post, put, del } = useApi();
  const location = useLocation();
  const [selectedAfterBlockId, setSelectedAfterBlockId] = useState(null);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await get('/api/blocks');
        if (response.ok) {
          const data = await response.json();
          setBlocks(
            data
              .filter(b => b && b.id && b.type)
              .map(b => ({
                ...b,
                content: typeof b.content === 'string' ? safeParse(b.content) : b.content
              }))
          );
        }
      } catch (e) {
        console.error("Ошибка загрузки блоков:", e);
      }
    };
    fetchBlocks();
  }, [get]);

  // Безопасный парсер JSON
  function safeParse(str) {
    try {
      return str && str !== '{}' ? JSON.parse(str) : {};
    } catch {
      return {};
    }
  }

  const handleMoveBlock = async (blockId, direction) => {
    const currentIndex = blocks.findIndex(b => b.id === blockId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;

    // Определяем afterBlockId
    let afterBlockId = null;
    if (direction === 'up') {
      afterBlockId = blocks[newIndex - 1]?.id || null;
    } else {
      afterBlockId = blocks[newIndex]?.id || null;
    }

    try {
      const response = await put('/api/Blocks/ChangePosition', {
        blockId: blockId,
        afterBlockId: afterBlockId
      });
      
      if (!response.ok) {
        console.error('Ошибка перемещения блока');
        return;
      }

      // Переставляем блоки локально
      const updatedBlocks = [...blocks];
      const [movedBlock] = updatedBlocks.splice(currentIndex, 1);
      let insertIndex = direction === 'up' ? newIndex : newIndex;
      updatedBlocks.splice(insertIndex, 0, movedBlock);
      setBlocks(updatedBlocks);
    } catch (e) {
      console.error('Ошибка при изменении порядка блоков:', e);
    }
  };

  const handleSaveHeader = (newLinks) => {
    if (setHeaderLinks) {
      setHeaderLinks(newLinks);
    }
  };

  const saveBlocks = async (updatedBlocks) => {
    const validBlocks = updatedBlocks.filter(b => 
      b?.id && b?.type
    );
    setBlocks(validBlocks);
    
    try {
      const response = await put('/api/blocks', validBlocks);
      if (!response.ok) {
        throw new Error('Failed to save blocks');
      }
    } catch (e) {
      console.error("Ошибка сохранения блоков:", e);
      // Можно добавить уведомление пользователю об ошибке
    }
  };

  const handleCreateBlock = async (newBlock) => {
    try {
      // Определяем afterBlockId для вставки после выбранного блока
      const afterBlockId = selectedAfterBlockId;
      const blockData = {
        Type: (newBlock.type || '').toLowerCase(),
        Title: newBlock.title || '',
        Content: typeof newBlock.content === 'object' ? JSON.stringify(newBlock.content) : newBlock.content,
        Visible: typeof newBlock.visible === 'boolean' ? newBlock.visible : true,
        Date: newBlock.date || new Date().toISOString().split('T')[0],
        IsExample: newBlock.isExample || false,
        AfterBlockId: afterBlockId || null
      };
      const response = await post('/api/blocks', blockData);
      if (response.ok) {
        const createdBlock = await response.json();
        // Вставляем новый блок после afterBlockId
        setBlocks(prev => {
          if (!afterBlockId) return [...prev, { ...createdBlock, content: typeof createdBlock.content === 'string' ? safeParse(createdBlock.content) : createdBlock.content }];
          const idx = prev.findIndex(b => b.id === afterBlockId);
          if (idx === -1) return [...prev, { ...createdBlock, content: typeof createdBlock.content === 'string' ? safeParse(createdBlock.content) : createdBlock.content }];
          const newArr = [...prev];
          newArr.splice(idx + 1, 0, { ...createdBlock, content: typeof createdBlock.content === 'string' ? safeParse(createdBlock.content) : createdBlock.content });
          return newArr;
        });
        setShowBlockModal(false);
        setSelectedAfterBlockId(null);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка создания блока');
      }
    } catch (e) {
      console.error('Ошибка создания блока:', e.message || 'Неизвестная ошибка');
      throw e;
    }
  };

  const updateBlock = async (id, newData) => {
    try {
        console.log('Updating block with data:', newData);
        
        // Форматируем данные для сервера
        const requestData = {
            Id: id,
            Type: (newData?.type || '').toLowerCase(),
            Title: newData?.title || '',
            Content: typeof newData?.content === 'object' ? JSON.stringify(newData.content) : (newData?.content || '{}'),
            Visible: typeof newData?.visible === 'boolean' ? newData.visible : true,
            Date: newData?.date || new Date().toISOString().split('T')[0],
            IsExample: newData?.isExample || false
        };

        console.log('Sending to server:', requestData);
        
        const response = await put(`/api/blocks/${id}`, requestData);
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server error response:', errorData);
            throw new Error(errorData.message || 'Ошибка при обновлении блока');
        }

        const updatedBlock = await response.json();
        console.log('Server response:', updatedBlock);
        
        if (updatedBlock) {
            // Обновляем блок в локальном состоянии
            setBlocks(prevBlocks => 
                prevBlocks.map(block => 
                    block.id === id ? {
                        ...block,
                        ...updatedBlock,
                        type: (updatedBlock.Type || updatedBlock.type || '').toLowerCase(),
                        title: updatedBlock.Title || updatedBlock.title || '',
                        content: typeof updatedBlock.Content === 'string' ? 
                            safeParse(updatedBlock.Content) : 
                            (updatedBlock.content || {}),
                        visible: updatedBlock.Visible ?? updatedBlock.visible ?? true,
                        date: updatedBlock.Date || updatedBlock.date || new Date().toISOString().split('T')[0],
                        isExample: updatedBlock.IsExample ?? updatedBlock.isExample ?? false
                    } : block
                )
            );
            return true;
        }
        return false;
    } catch (error) {
        console.error('Ошибка обновления блока:', error);
        if (error.response) {
            console.error('Ответ сервера:', error.response.data);
        }
        throw error;
    }
  };

  const removeBlock = async (id) => {
    try {
      const response = await del(`/api/blocks/${id}`);
      if (response.ok) {
        setBlocks(blocks.filter(block => block.id !== id));
      }
    } catch (e) {
      console.error("Ошибка удаления блока:", e);
    }
  };

  const toggleVisibility = async (id) => {
    const block = blocks.find(b => b.id === id);
    if (block) {
      await updateBlock(id, { ...block, visible: !block.visible });
    }
  };

  if (!isAdmin) {
    return <div className="p-4 text-center font-bold">Нет доступа. Пожалуйста, войдите в систему.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Кнопка открытия меню */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-4 right-4 z-50 p-2 bg-[#0C3281] text-white rounded-lg hover:bg-[#0a2a6d]"
      >
        <FiMenu size={24} />
      </button>

      {/* Боковое меню */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} z-40`}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Админ-панель</h2>
          <nav className="space-y-2">
            {isSuperAdmin && (
              <Link
                to="/admin/manage-admins"
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiUsers className="text-[#0C3281]" />
                <span>Управление админами</span>
              </Link>
            )}
            <Link
              to="/admin/landings"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiLayout className="text-[#0C3281]" />
              <span>Создание лендинга</span>
            </Link>
            <Link
              to="/admin/gallery"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiImage className="text-[#0C3281]" />
              <span>Галерея работ</span>
            </Link>
            <Link
              to="/admin/reviews"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiMessageSquare className="text-[#0C3281]" />
              <span>Отзывы</span>
            </Link>
            <button
              onClick={() => {
                setShowHeaderEditor(true);
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 p-2 rounded hover:bg-gray-100 text-left"
            >
              <FiSettings className="text-[#0C3281]" />
              <span>Изменить шапку</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Основной контент */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Управление контентом</h1>

        <div className="space-y-4">
          {blocks.map((block, idx) => (
            <div key={block.id}>
              <EditableBlock
                block={block}
                onSave={(updatedBlock) => updateBlock(block.id, updatedBlock)}
                onDelete={() => removeBlock(block.id)}
                onToggleVisibility={toggleVisibility}
                onMoveUp={() => handleMoveBlock(block.id, 'up')}
                onMoveDown={() => handleMoveBlock(block.id, 'down')}
                isAdminView={true}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowBlockModal(true)}
          className="w-full text-left px-6 py-4 bg-[#0C3281] text-white hover:bg-[#0a2a6d] mt-8 font-bold flex items-center gap-2"
        >
          <FiPlus /> Добавить блок
        </button>
      </div>

      {showBlockModal && (
        <BlockTypeModal
          onClose={() => setShowBlockModal(false)}
          onCreate={handleCreateBlock}
        />
      )}

      {showHeaderEditor && (
        <HeaderEditor
          onClose={() => setShowHeaderEditor(false)}
          headerLinks={headerLinks || []}
          onSave={handleSaveHeader}
        />
      )}
    </div>
  );
};

export default AdminPanel;