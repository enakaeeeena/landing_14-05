import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { useApi } from '../../../hooks/useApi';

const HeaderEditor = ({ headerLinks, onSave, onClose }) => {
  const [links, setLinks] = useState([...headerLinks]);
  const [newLink, setNewLink] = useState({ 
    type: 'navigate', 
    path: '', 
    label: '',
    blockId: ''
  });
  const [blocks, setBlocks] = useState([]);
  const { get } = useApi();

  useEffect(() => {
    loadBlocks();
  }, []);

  const loadBlocks = async () => {
    try {
      const response = await get('/api/blocks');
      if (response.ok) {
        const data = await response.json();
        setBlocks(data);
      }
    } catch (error) {
      console.error('Ошибка загрузки блоков:', error);
    }
  };

  const handleAddLink = () => {
    if (newLink.label && ((newLink.type === 'navigate' && newLink.path) || (newLink.type === 'scroll' && newLink.blockId))) {
      const linkToAdd = {
        type: newLink.type,
        path: newLink.type === 'navigate' ? newLink.path : `#${newLink.blockId}`,
        label: newLink.label,
        blockId: newLink.type === 'scroll' ? newLink.blockId : undefined
      };
      setLinks([...links, linkToAdd]);
      setNewLink({ type: 'navigate', path: '', label: '', blockId: '' });
    }
  };

  const handleRemoveLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(links);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
      <div className="bg-white p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Редактирование шапки</h2>
          <button onClick={onClose} className="text-2xl">
            <FiX />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {links.map((link, index) => (
            <div key={index} className="flex gap-2 items-center">
              <select
                value={link.type || 'navigate'}
                onChange={(e) => {
                  const updated = [...links];
                  updated[index].type = e.target.value;
                  if (e.target.value === 'scroll') {
                    updated[index].path = `#${updated[index].blockId || ''}`;
                  }
                  setLinks(updated);
                }}
                className="border p-2 w-40"
              >
                <option value="navigate">Перейти на страницу</option>
                <option value="scroll">Прокрутить до блока</option>
              </select>

              {link.type === 'navigate' ? (
                <input
                  type="text"
                  value={link.path}
                  onChange={(e) => {
                    const updated = [...links];
                    updated[index].path = e.target.value;
                    setLinks(updated);
                  }}
                  className="border p-2 flex-1"
                  placeholder="Путь (/about)"
                />
              ) : (
                <select
                  value={link.blockId || ''}
                  onChange={(e) => {
                    const updated = [...links];
                    updated[index].blockId = e.target.value;
                    updated[index].path = `#${e.target.value}`;
                    setLinks(updated);
                  }}
                  className="border p-2 flex-1"
                >
                  <option value="">Выберите блок</option>
                  {blocks.map(block => (
                    <option key={block.id} value={block.id}>
                      {block.title || `Блок ${block.id}`}
                    </option>
                  ))}
                </select>
              )}

              <input
                type="text"
                value={link.label}
                onChange={(e) => {
                  const updated = [...links];
                  updated[index].label = e.target.value;
                  setLinks(updated);
                }}
                className="border p-2 flex-1"
                placeholder="Текст ссылки"
              />
              <button
                onClick={() => handleRemoveLink(index)}
                className="bg-red-500 text-white p-2"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          <select
            value={newLink.type}
            onChange={(e) => setNewLink({ ...newLink, type: e.target.value })}
            className="border p-2 w-40"
          >
            <option value="navigate">Перейти на страницу</option>
            <option value="scroll">Прокрутить до блока</option>
          </select>

          {newLink.type === 'navigate' ? (
            <input
              type="text"
              value={newLink.path}
              onChange={(e) => setNewLink({ ...newLink, path: e.target.value })}
              className="border p-2 flex-1"
              placeholder="Новый путь"
            />
          ) : (
            <select
              value={newLink.blockId}
              onChange={(e) => setNewLink({ ...newLink, blockId: e.target.value })}
              className="border p-2 flex-1"
            >
              <option value="">Выберите блок</option>
              {blocks.map(block => (
                <option key={block.id} value={block.id}>
                  {block.title || `Блок ${block.id}`}
                </option>
              ))}
            </select>
          )}

          <input
            type="text"
            value={newLink.label}
            onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
            className="border p-2 flex-1"
            placeholder="Новый текст"
          />
          <button
            onClick={handleAddLink}
            className="bg-blue-500 text-white px-4 py-2"
          >
            Добавить
          </button>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border hover:bg-gray-100"
          >
            Отмена
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white hover:bg-green-600"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderEditor;