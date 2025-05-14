import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { FiCheck, FiX, FiPlus } from 'react-icons/fi';

const GalleryPage = () => {
  const [works, setWorks] = useState([]);
  const [selectedWorks, setSelectedWorks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWork, setNewWork] = useState({
    title: '',
    description: '',
    imageUrl: '',
    author: ''
  });
  const { get, post } = useApi();

  useEffect(() => {
    loadWorks();
  }, []);

  const loadWorks = async () => {
    try {
      // Получаем все работы из Skills Passport
      const response = await get('/api/Works/GetWorks');
      if (response.ok) {
        const data = await response.json();
        setWorks(data);
      }
    } catch (error) {
      console.error('Ошибка загрузки работ:', error);
    }
  };

  const toggleWorkSelection = (workId) => {
    setSelectedWorks(prev => 
      prev.includes(workId)
        ? prev.filter(id => id !== workId)
        : [...prev, workId]
    );
  };

  const saveSelectedWorks = async () => {
    try {
      // Обновляем выбранные работы
      const updatePromises = selectedWorks.map(workId => {
        const work = works.find(w => w.id === workId);
        return post('/api/ProgramPages/EditBlock', {
          id: workId,
          type: 'gallery',
          title: work.title,
          content: JSON.stringify({
            imageUrl: work.imageUrl,
            title: work.title,
            description: work.description,
            author: work.author
          }),
          visible: true,
          date: work.date,
          isExample: "false"
        });
      });

      await Promise.all(updatePromises);
      alert('Выбранные работы успешно сохранены');
    } catch (error) {
      console.error('Ошибка сохранения работ:', error);
    }
  };

  const handleAddWork = async () => {
    try {
      const response = await post('/api/Works/CreateWork', {
        title: newWork.title,
        description: newWork.description,
        imageUrl: newWork.imageUrl,
        author: newWork.author,
        date: new Date().toISOString().split('T')[0]
      });

      if (response.ok) {
        const createdWork = await response.json();
        setWorks([...works, createdWork]);
        setShowAddModal(false);
        setNewWork({
          title: '',
          description: '',
          imageUrl: '',
          author: ''
        });
        alert('Работа успешно добавлена');
      }
    } catch (error) {
      console.error('Ошибка создания работы:', error);
      alert('Ошибка при создании работы');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Галерея работ</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
          >
            <FiPlus /> Добавить работу
          </button>
          <button
            onClick={saveSelectedWorks}
            className="px-6 py-2 bg-[#0C3281] text-white rounded hover:bg-[#0a2a6d]"
          >
            Сохранить выбранные работы
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map(work => (
          <div
            key={work.id}
            className="relative bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={work.imageUrl}
              alt={work.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold mb-2">{work.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{work.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Автор: {work.author}
                </span>
                <button
                  onClick={() => toggleWorkSelection(work.id)}
                  className={`p-2 rounded-full ${
                    selectedWorks.includes(work.id)
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {selectedWorks.includes(work.id) ? (
                    <FiCheck size={20} />
                  ) : (
                    <FiX size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Добавить новую работу</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Название</label>
                <input
                  type="text"
                  value={newWork.title}
                  onChange={(e) => setNewWork({...newWork, title: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Описание</label>
                <textarea
                  value={newWork.description}
                  onChange={(e) => setNewWork({...newWork, description: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">URL изображения</label>
                <input
                  type="text"
                  value={newWork.imageUrl}
                  onChange={(e) => setNewWork({...newWork, imageUrl: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Автор</label>
                <input
                  type="text"
                  value={newWork.author}
                  onChange={(e) => setNewWork({...newWork, author: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                onClick={handleAddWork}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage; 