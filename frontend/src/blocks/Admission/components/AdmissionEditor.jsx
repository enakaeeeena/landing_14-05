import { useState } from 'react';

export const AdmissionEditor = ({ content = {}, setContent }) => {
  const [formData, setFormData] = useState({
    educationLevel: content.educationLevel || '',
    educationForm: content.educationForm || '',
    budgetPlaces: content.budgetPlaces || '',
    department: content.department || ''
  });

  const handleSave = () => {
    setContent({ ...content, ...formData });
  };

  return (
    <div className="space-y-8 p-6 border-3 border-black rounded-xl">
      <h2 className="text-4xl font-bold mb-6">Редактор блока "Для абитуриентов"</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xl font-bold mb-2">Уровень обучения:</label>
            <input
              type="text"
              value={formData.educationLevel}
              onChange={(e) => setFormData({...formData, educationLevel: e.target.value})}
              className="w-full p-3 border-2 border-black rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-xl font-bold mb-2">Форма обучения:</label>
            <input
              type="text"
              value={formData.educationForm}
              onChange={(e) => setFormData({...formData, educationForm: e.target.value})}
              className="w-full p-3 border-2 border-black rounded-lg"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xl font-bold mb-2">Бюджетные места:</label>
            <input
              type="number"
              value={formData.budgetPlaces}
              onChange={(e) => setFormData({...formData, budgetPlaces: e.target.value})}
              className="w-full p-3 border-2 border-black rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-xl font-bold mb-2">Учебное подразделение:</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              className="w-full p-3 border-2 border-black rounded-lg"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xl font-bold"
      >
        Сохранить изменения
      </button>
    </div>
  );
};