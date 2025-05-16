import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContactModal from './components/ContactModal';
import ProjectModal from './components/ProjectModal';
import Filters from './components/Filters'; 
import ProfileCardModal from './components/ProfileCardModal';

const ProfileView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    mainImage: null,
    otherImages: [],
    tags: ''
  });
  const [openProject, setOpenProject] = useState(null);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState(Array(4).fill(null));

  // 🔹 Состояния фильтров
  const [yearFilter, setYearFilter] = useState('');
  const [directionFilter, setDirectionFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('earliest');

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = savedUsers.find((u) => u.id === id);
    if (foundUser) {
      setUser(foundUser);
      setProjects(foundUser.projects || []);
    }
  }, [id]);

  const handleProjectSave = () => {
    const updatedProjects = [
      ...projects,
      {
        ...newProject,
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        direction: directionFilter || '', 
        mainImageUrl: URL.createObjectURL(newProject.mainImage),
        otherImageUrls: Array.from(newProject.otherImages).map(file => URL.createObjectURL(file)),
      }
    ];

    const updatedUser = {
      ...user,
      projects: updatedProjects
    };

    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = allUsers.map(u => u.id === user.id ? updatedUser : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setUser(updatedUser);
    setProjects(updatedProjects);
    setShowProjectForm(false);
    setNewProject({ title: '', description: '', mainImage: null, otherImages: [], tags: '' });
  };

  const handleAddProjectToCard = (project) => {
    const emptySlotIndex = selectedProjects.findIndex(p => p === null);
    if (emptySlotIndex !== -1) {
      const updatedSelectedProjects = [...selectedProjects];
      updatedSelectedProjects[emptySlotIndex] = project;
      setSelectedProjects(updatedSelectedProjects);
    }
  };

  // 🔹 Фильтрация и сортировка
  const filteredProjects = projects
    .filter((proj) => {
      const matchesYear = !yearFilter || proj.date?.includes(yearFilter);
      const matchesDirection = !directionFilter || proj.direction?.toLowerCase() === directionFilter.toLowerCase();
      const matchesTag = !tagFilter || proj.tags?.toLowerCase().includes(tagFilter.toLowerCase());
      return matchesYear && matchesDirection && matchesTag;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
    });

  if (!user) return <div className="p-6">Профиль не найден.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Фото и ФИО */}
      <div className="flex gap-6 items-start">
        {user.photo ? (
          <img src={user.photo} alt="profile" className="w-40 h-40 object-cover rounded border" />
        ) : (
          <div className="w-40 h-40 bg-gray-200 rounded border flex items-center justify-center text-sm text-gray-500">фото</div>
        )}
        <div className="flex flex-col justify-between h-40">
          <div>
          <div className="text-2xl font-semibold">{user.lastName} {user.firstName} {user.middleName}</div>
            <div className="text-gray-600 mt-1">{user.skill}</div>
          </div>
          <div className="flex gap-4 mt-4">
            <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Связаться</button>
            <button onClick={() => navigate(`/skills/${user.id}`)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Редактировать</button>
          </div>
        </div>
      </div>

      {/* Обо мне */}
      <div>
        <h2 className="font-semibold">Обо мне</h2>
        <p className="mt-1 text-gray-800">{user.aboutMe || '—'}</p>
      </div>

      {/* Кнопки проектов */}
      <div className="flex gap-4">
        <button onClick={() => setShowProjectForm(true)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Добавить проект</button>
        <button onClick={() => setShowProfileCard(true)} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Карточка профиля</button>
      </div>

      {/* Форма добавления проекта */}
      {showProjectForm && (
        <div className="border p-4 rounded space-y-4 bg-gray-50">
          <input
            type="text"
            placeholder="Название"
            value={newProject.title}
            onChange={e => setNewProject({ ...newProject, title: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Описание"
            value={newProject.description}
            onChange={e => setNewProject({ ...newProject, description: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <div>
            <label>Главное изображение:</label>
            <input type="file" accept="image/*" onChange={e => setNewProject({ ...newProject, mainImage: e.target.files[0] })} />
          </div>
          <div>
            <label>Остальные изображения:</label>
            <input type="file" accept="image/*" multiple onChange={e => setNewProject({ ...newProject, otherImages: e.target.files })} />
          </div>
          <input
            type="text"
            placeholder="Теги (через пробел)"
            value={newProject.tags}
            onChange={e => setNewProject({ ...newProject, tags: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <button onClick={handleProjectSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Сохранить</button>
        </div>
      )}

      {/* 🔹 Компонент фильтров */}
      <Filters
        year={yearFilter}
        direction={directionFilter}
        tag={tagFilter}
        sortOrder={sortOrder}
        onYearChange={setYearFilter}
        onDirectionChange={setDirectionFilter}
        onTagChange={setTagFilter}
        onSortOrderChange={setSortOrder}
      />

      {/* Проекты */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4 mt-6">
        {filteredProjects.map((proj) => (
          <div key={proj.id} onClick={() => setOpenProject(proj)} className="cursor-pointer break-inside-avoid">
            <img src={proj.mainImageUrl} alt={proj.title} className="w-full rounded-lg object-cover" />
          </div>
        ))}
      </div>

      {/* Модальные окна */}
      {showModal && <ContactModal user={user} onClose={() => setShowModal(false)} />}
      {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
      
      {showProfileCard && (
  <ProfileCardModal
    user={user}
    selectedProjects={selectedProjects}
    filteredProjects={filteredProjects}
    onClose={() => setShowProfileCard(false)}
    onRemoveProject={(index) => {
      const updated = [...selectedProjects];
      updated[index] = null;
      setSelectedProjects(updated);
    }}
    onAddProjectToCard={handleAddProjectToCard}
    onPublish={(profileData) => {
      // Здесь должна быть логика сохранения в localStorage/отправки на сервер
      localStorage.setItem('publishedProfile', JSON.stringify(profileData));
      navigate('/auth'); // Перенаправляем на страницу авторизации
    }}
  />
)}
    </div>
  );
};

export default ProfileView;