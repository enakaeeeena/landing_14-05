import { useState, useEffect } from 'react';
import { FiUpload, FiTrash2, FiPlus, FiEdit, FiSave } from 'react-icons/fi';

export const ProfessorsEditor = ({ content = {}, setContent }) => {
  const [newProfessor, setNewProfessor] = useState({
    id: null,
    name: '',
    position: '',
    photo: null,
    link: '',
    favorite: false
  });

  useEffect(() => {
    if (!content.professors) {
      setContent({ ...content, professors: [] });
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setContent(prev => ({
          ...prev,
          professors: prev.professors.map(p => 
            p.id === newProfessor.id 
              ? { ...newProfessor, photo: event.target.result }
              : p
          )
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProfessor = () => {
    if (!newProfessor.name || !newProfessor.position) return;

    const updatedProfessors = newProfessor.id
      ? content.professors.map(p => 
          p.id === newProfessor.id ? newProfessor : p
        )
      : [...content.professors, { ...newProfessor, id: Date.now() }];

    setContent({ ...content, professors: updatedProfessors });
    setNewProfessor({
      id: null,
      name: '',
      position: '',
      photo: null,
      link: '',
      favorite: false
    });
  };

  const handleEdit = (professor) => {
    setNewProfessor(professor);
  };

  const handleDelete = (id) => {
    const updatedProfessors = content.professors.filter(p => p.id !== id);
    setContent({ ...content, professors: updatedProfessors });
  };

  return (
    <div className="space-y-12">
      <div className="relative">
        <h2 className="text-30px font-bold text-left pr-8">
          <span className="relative z-10 bg-white pl-8">
            Редактор преподавателей
          </span>
        </h2>
      </div>

      <div className="border-3 border-black p-8">
        <h3 className="text-4xl font-bold mb-6">
          {newProfessor.id ? 'Редактирование' : 'Добавление преподавателя'}
        </h3>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="ФИО преподавателя"
              className="w-full p-3 border-3 border-black text-xl"
              value={newProfessor.name}
              onChange={(e) => setNewProfessor({...newProfessor, name: e.target.value})}
            />

            <input
              type="text"
              placeholder="Должность"
              className="w-full p-3 border-3 border-black text-xl"
              value={newProfessor.position}
              onChange={(e) => setNewProfessor({...newProfessor, position: e.target.value})}
            />

            <input
              type="url"
              placeholder="Ссылка на профиль"
              className="w-full p-3 border-3 border-black text-xl"
              value={newProfessor.link}
              onChange={(e) => setNewProfessor({...newProfessor, link: e.target.value})}
            />

            <label className="flex items-center gap-3 text-xl">
              <input
                type="checkbox"
                checked={newProfessor.favorite}
                onChange={(e) => setNewProfessor({...newProfessor, favorite: e.target.checked})}
                className="w-5 h-5"
              />
              Показывать на главной
            </label>
          </div>

          <div className="border-3 border-dashed border-black p-6">
            <label className="block text-xl mb-4">Фото преподавателя:</label>
            <label className="inline-flex items-center gap-3 cursor-pointer bg-gray-100 px-6 py-3 text-lg">
              <FiUpload /> Загрузить фото
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {newProfessor.photo && (
              <div className="mt-6 relative">
                <img 
                  src={newProfessor.photo} 
                  alt="Preview" 
                  className="w-64 h-64 object-cover border-3 border-black"
                />
                <button
                  onClick={() => setNewProfessor({...newProfessor, photo: null})}
                  className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleAddProfessor}
          className={`mt-6 px-8 py-3 text-xl font-bold ${
            newProfessor.id 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-black text-white hover:bg-gray-800'
          }`}
          disabled={!newProfessor.name || !newProfessor.position}
        >
          {newProfessor.id ? <FiSave className="inline mr-2" /> : <FiPlus className="inline mr-2" />}
          {newProfessor.id ? 'Сохранить изменения' : 'Добавить преподавателя'}
        </button>
      </div>

      <div className="border-3 border-black p-8">
        <h3 className="text-4xl font-bold mb-6">Список преподавателей</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.professors?.map(professor => (
            <div key={professor.id} className="border-3 border-black p-4 relative">
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => handleEdit(professor)}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                >
                  <FiEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(professor.id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>

              {professor.photo && (
                <img 
                  src={professor.photo} 
                  alt={professor.name} 
                  className="w-full h-64 object-cover border-3 border-black mb-4"
                />
              )}
              <h4 className="text-2xl font-bold mb-2">{professor.name}</h4>
              <p className="text-xl text-gray-600 mb-3">{professor.position}</p>
              {professor.link && (
                <a
                  href={professor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-lg"
                >
                  Ссылка на профиль →
                </a>
              )}
              {professor.favorite && (
                <div className="mt-3 text-sm text-yellow-500">
                  Отображается на главной
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};