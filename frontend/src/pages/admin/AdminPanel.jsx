import { useAdmin } from '../admin/context/AdminContext'; 
import { useEffect, useState } from 'react';
import EditableBlock from '../../Components/blocks/EditableBlock';
import { FiPlus, FiUsers, FiLayout, FiImage, FiMessageSquare, FiMenu, FiSettings } from 'react-icons/fi';
import BlockTypeModal from '../admin/components/BlockTypeModal';
import { useApi } from '../../hooks/useApi';
import { Link, useLocation, Outlet } from 'react-router-dom';
import HeaderEditor from '../admin/components/HeaderEditor';
import FooterBlockEditor from '../../blocks/FooterBlock/components/FooterBlockEditor';

const AdminPanel = ({ headerLinks, setHeaderLinks }) => {
  const { isAdmin, isSuperAdmin } = useAdmin();
  const [blocks, setBlocks] = useState([]);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeaderEditor, setShowHeaderEditor] = useState(false);
  const { get, post, put, del } = useApi();
  const location = useLocation();
  const [selectedAfterBlockId, setSelectedAfterBlockId] = useState(null);
  const [showFooterEditor, setShowFooterEditor] = useState(false);
  const [footerContent, setFooterContent] = useState(() => {
    const saved = localStorage.getItem('footerContent');
    return saved ? JSON.parse(saved) : {
      logo: '',
      address: 'г. Санкт–Петербург\nм. Невский проспект,\nнаб. реки Мойки, 4В',
      links: [],
      phone: '',
      email: '',
    };
  });

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

  useEffect(() => {
    localStorage.setItem('footerContent', JSON.stringify(footerContent));
  }, [footerContent]);

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
      const createdBlock = response;
      setBlocks(prev => [...prev, { 
        ...createdBlock, 
        id: createdBlock.Id || createdBlock.id,
        type: (createdBlock.Type || createdBlock.type || '').toLowerCase(),
        title: createdBlock.Title || createdBlock.title || '',
        content: typeof createdBlock.Content === 'string' ? 
          safeParse(createdBlock.Content) : 
          (createdBlock.content || {}),
        visible: createdBlock.Visible ?? createdBlock.visible ?? true,
        date: createdBlock.Date || createdBlock.date || new Date().toISOString().split('T')[0],
        isExample: createdBlock.IsExample ?? createdBlock.isExample ?? false
      }]);
      setShowBlockModal(false);
      setSelectedAfterBlockId(null);
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
            id: id,
            type: (newData?.type || '').toLowerCase(),
            title: newData?.title || '',
            content: typeof newData?.content === 'object' ? JSON.stringify(newData.content) : (newData?.content || '{}'),
            visible: typeof newData?.visible === 'boolean' ? newData.visible : true,
            date: newData?.date || new Date().toISOString().split('T')[0],
            isExample: String(newData?.isExample || false) // Конвертируем в строку
        };

        console.log('Sending to server:', requestData);
        
        const response = await put(`/api/blocks/${id}`, requestData);
        const updatedBlock = response;
        console.log('Server response:', updatedBlock);
        
        if (updatedBlock) {
            // Обновляем блок в локальном состоянии
            setBlocks(prevBlocks => 
                prevBlocks.map(block => 
                    block.id === id ? {
                        ...block,
                        ...updatedBlock,
                        type: (updatedBlock.type || '').toLowerCase(),
                        title: updatedBlock.title || '',
                        content: typeof updatedBlock.content === 'string' ? 
                            safeParse(updatedBlock.content) : 
                            (updatedBlock.content || {}),
                        visible: updatedBlock.visible ?? true,
                        date: updatedBlock.date || new Date().toISOString().split('T')[0],
                        isExample: updatedBlock.isExample === 'true' || updatedBlock.isExample === true
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
      await del(`/api/blocks/${id}`);
      setBlocks(blocks.filter(block => block.id !== id));
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
                to="/ITxD-skills/admin/manage-admins"
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiUsers className="text-[#0C3281]" />
                <span>Управление админами</span>
              </Link>
            )}
            <Link
              to="/ITxD-skills/admin/landings"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiLayout className="text-[#0C3281]" />
              <span>Создание лендинга</span>
            </Link>
            <Link
              to="/ITxD-skills/admin/gallery"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiImage className="text-[#0C3281]" />
              <span>Галерея работ</span>
            </Link>
            <Link
              to="/ITxD-skills/admin/reviews"
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
            <button
              onClick={() => {
                setShowFooterEditor(true);
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 p-2 rounded hover:bg-gray-100 text-left"
            >
              <FiSettings className="text-[#0C3281]" />
              <span>Изменить футер</span>
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

      {showFooterEditor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
          <div className="bg-gray-50 p-8 w-full max-w-5xl rounded-2xl shadow-2xl relative">
            <button onClick={() => setShowFooterEditor(false)} className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-black">✕</button>
            <FooterBlockEditor 
              content={footerContent} 
              setContent={setFooterContent} 
              onSave={(newContent) => {
                setFooterContent(newContent);
                setShowFooterEditor(false);
              }}
            />
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default AdminPanel;