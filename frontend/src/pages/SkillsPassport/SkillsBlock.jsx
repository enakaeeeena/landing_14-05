import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const SkillsBlock = () => {
  const navigate = useNavigate();
  const { id: editId } = useParams(); // <-- используем URL-параметр

  const [customSkill, setCustomSkill] = useState('');
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    aboutMe: '',
    skill: '',
    photo: '',
    contact: {
      telegram: '',
      vkontakte: '',
      email: '',
      phone: '',
      preferredTime: '',
    },
    projects: [],
  });

  useEffect(() => {
    if (editId) {
      const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = savedUsers.find((u) => u.id === editId);
      if (foundUser) {
        setUserData(foundUser);
        if (
          !['типография', 'иллюстрация', 'UI-дизайн', '3D'].includes(foundUser.skill)
        ) {
          setUserData((prev) => ({ ...prev, skill: 'другое' }));
          setCustomSkill(foundUser.skill);
        }
      }
    }
  }, [editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in userData.contact) {
      setUserData((prev) => ({
        ...prev,
        contact: { ...prev.contact, [name]: value },
      }));
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsPhotoLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 300;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);

        setUserData((prev) => ({
          ...prev,
          photo: compressedDataUrl,
        }));

        setIsPhotoLoading(false);
      };
    };
  };

  const handleSave = () => {
    if (isPhotoLoading) {
      alert('Фото ещё загружается. Подождите!');
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const finalSkill = userData.skill === 'другое' ? customSkill : userData.skill;

    if (editId) {
      const updatedUsers = savedUsers.map((user) =>
        user.id === editId ? { ...userData, skill: finalSkill, id: editId } : user
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      navigate(`/skills/profile/${editId}`);
    } else {
      const id = uuidv4();
      const newUser = { ...userData, id, skill: finalSkill };
      savedUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(savedUsers));
      navigate(`/skills/profile/${id}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Левая часть: Фото и "Обо мне" */}
        <div className="flex flex-col items-center md:items-start">
          {userData.photo ? (
            <img
              src={userData.photo}
              alt="profile"
              className="w-40 h-40 object-cover rounded border"
            />
          ) : (
            <div className="w-40 h-40 bg-gray-200 rounded border flex items-center justify-center text-sm text-gray-500">
              фото
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="mt-2 text-sm"
          />
          <textarea
            name="aboutMe"
            placeholder="обо мне"
            value={userData.aboutMe}
            onChange={handleChange}
            className="mt-4 border p-2 w-60 h-24"
          />
        </div>

        {/* Правая часть: ФИО, Навыки, Контакты и Кнопка */}
        <div className="flex-1">
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              name="lastName"
              placeholder="фамилия *"
              value={userData.lastName}
              onChange={handleChange}
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="firstName"
              placeholder="имя *"
              value={userData.firstName}
              onChange={handleChange}
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="middleName"
              placeholder="отчество (необязательно)"
              value={userData.middleName}
              onChange={handleChange}
              className="border p-2 w-full"
            />

            {/* Навык */}
            <select
              name="skill"
              value={userData.skill}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="">выбери навык *</option>
              <option value="типография">типография</option>
              <option value="иллюстрация">иллюстрация</option>
              <option value="UI-дизайн">UI-дизайн</option>
              <option value="3D">3D</option>
              <option value="другое">другое</option>
            </select>
            {userData.skill === 'другое' && (
              <input
                type="text"
                placeholder="введите свой навык"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                className="border p-2 w-full"
              />
            )}

            {/* Контакты */}
            <h3 className="mt-6 mb-2 font-semibold">Контакты (необязательно)</h3>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="telegram"
                placeholder="Telegram"
                value={userData.contact.telegram}
                onChange={handleChange}
                className="border p-2 w-full"
              />
              <input
                type="text"
                name="vkontakte"
                placeholder="ВКонтакте"
                value={userData.contact.vkontakte}
                onChange={handleChange}
                className="border p-2 w-full"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={userData.contact.email}
                onChange={handleChange}
                className="border p-2 w-full"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Телефон"
                value={userData.contact.phone}
                onChange={handleChange}
                className="border p-2 w-full"
              />
              <textarea
                name="preferredTime"
                placeholder="Когда лучше писать?"
                value={userData.contact.preferredTime}
                onChange={handleChange}
                className="border p-2 w-full h-20"
              />
            </div>

            {/* Кнопка */}
            <div className="flex mt-4">
              <button
                onClick={handleSave}
                disabled={isPhotoLoading}
                className={`px-4 py-2 ${
                  isPhotoLoading
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isPhotoLoading ? 'загрузка...' : 'просмотр'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsBlock;
