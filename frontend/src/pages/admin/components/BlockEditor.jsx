import { useState, useEffect } from 'react';
import { FiPlus, FiEye, FiEyeOff } from 'react-icons/fi';

const BlockEditor = () => {
  const [blocks, setBlocks] = useState([]);
  const [showBlockModal, setShowBlockModal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('pageBlocks');
    if (stored) setBlocks(JSON.parse(stored));
  }, []);

  const toggleBlockVisibility = (id) => {
    const updated = blocks.map(block => 
      block.id === id ? { ...block, isVisible: !block.isVisible } : block
    );
    setBlocks(updated);
    localStorage.setItem('pageBlocks', JSON.stringify(updated));
  };

  const deleteBlock = (id) => {
    const updated = blocks.filter(b => b.id !== id);
    setBlocks(updated);
    localStorage.setItem('pageBlocks', JSON.stringify(updated));
  };

  const addBlock = (newBlock) => {
    const updated = [...blocks, newBlock];
    setBlocks(updated);
    localStorage.setItem('pageBlocks', JSON.stringify(updated));
  };
  const updateBlock = (id, newContent) => {
    const updated = blocks.map(block => 
      block.id === id ? { ...block, content: newContent } : block
    );
    setBlocks(updated);
    localStorage.setItem('pageBlocks', JSON.stringify(updated));
  };

  return (
    <div className="w-full pb-16">
      <div className="w-full border-b-4 border-black p-4">
        <h2 className="text-3xl font-bold">Управление контентом</h2>
      </div>

      <div className="w-full">
        {blocks.map((block) => (
          <div key={block.id} className="w-full">
            {!block.isVisible ? (
              <button
                onClick={() => toggleBlockVisibility(block.id)}
                className="w-full text-left px-6 py-4 border-t border-b border-black bg-white hover:bg-gray-50"
              >
                Развернуть блок: {block.title}
              </button>
            ) : (
              <div className="w-full border-t border-b border-black">
                <div className="flex justify-between items-center px-6 py-4">
                  <div className="text-30px font-bold">{block.title}</div>
                  <div className="relative group">
                    <button className="p-2 border border-black hover:bg-gray-50">⚙</button>
                    <div className="absolute right-0 top-full mt-1 hidden group-hover:flex flex-col border border-black bg-white z-10">
                      <button
                        onClick={() => toggleBlockVisibility(block.id)}
                        className="px-4 py-2 hover:bg-gray-100 border-b border-black text-left"
                      >
                        Скрыть
                      </button>
                      <button className="px-4 py-2 hover:bg-gray-100 border-b border-black text-left">
                        Редактировать
                      </button>
                      <button
                        onClick={() => deleteBlock(block.id)}
                        className="px-4 py-2 hover:bg-red-100 text-red-600 text-left"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  {block.type === 'text' && <p>{block.content}</p>}
                  {block.type === 'image' && (
                    <img
                      src={block.url}
                      alt={block.alt}
                      className="w-full h-48 object-cover"
                    />
                  )}
                </div>
                <button
                  onClick={() => toggleBlockVisibility(block.id)}
                  className="w-full text-left px-6 py-4 border-t border-black bg-white hover:bg-gray-50"
                >
                  Скрыть блок: {block.title}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-full border-t border-black fixed bottom-0 left-0 right-0">
        <button
          onClick={() => setShowBlockModal(true)}
          className="w-full text-left px-6 py-4 bg-white hover:bg-gray-50"
        >
          <FiPlus className="inline-block mr-2" /> Добавить блок
        </button>
      </div>

      {showBlockModal && (
        <BlockTypeModal
          onClose={() => setShowBlockModal(false)}
          onCreate={addBlock}
        />
      )}
    </div>
  );
};

const BlockTypeModal = ({ onClose, onCreate }) => {
  const [type, setType] = useState('text');
  const [title, setTitle] = useState('');

  const handleCreate = () => {
    onCreate({
      id: Date.now(),
      type,
      title,
      content: '',
      url: '',
      alt: '',
      isVisible: true,
    });
    onClose();
  };
  return (
    <div className="w-full">
      <div className="w-full border-b-4 border-black p-4">
        <h2 className="text-3xl font-bold">Управление контентом</h2>
      </div>

      <div className="w-full">
        {blocks.map(block => (
          <EditableBlock
            key={block.id}
            block={block}
            onSave={(updatedBlock) => updateBlock(block.id, updatedBlock.content)}
            onDelete={() => deleteBlock(block.id)}
            onToggleVisibility={toggleBlockVisibility}
            isAdminView={true}
          />
        ))}
      </div>

      <div className="w-full border-t border-black">
        <button
          onClick={() => setShowBlockModal(true)}
          className="w-full text-left px-6 py-4 bg-white hover:bg-gray-50"
        >
          <FiPlus className="inline-block mr-2" /> Добавить блок
        </button>
      </div>
    </div>
  )

  
};

export default BlockEditor;