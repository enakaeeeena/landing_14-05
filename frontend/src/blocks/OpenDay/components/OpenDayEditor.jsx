import React from 'react';
import { FiUpload } from 'react-icons/fi';

export const OpenDayEditor = ({ content, setContent }) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent({ ...content, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-gray-300 p-4 rounded">
        <h3 className="text-30px font-bold mb-2">Заголовок</h3>
        <input
          type="text"
          className="w-full bg-transparent outline-none font-normal"
          style={{ fontVariationSettings: '"wght" 400' }}
          value={content.title || ''}
          onChange={(e) => setContent({...content, title: e.target.value})}
        />
      </div>
      
      <div className="border-2 border-dashed border-gray-300 p-4 rounded">
        <h3 className="text-30px font-bold mb-2">Описание</h3>
        <textarea
          className="w-full bg-transparent outline-none min-h-[100px] font-normal"
          style={{ fontVariationSettings: '"wght" 400' }}
          value={content.description || ''}
          onChange={(e) => setContent({...content, description: e.target.value})}
        />
      </div>

      <div className="border-2 border-dashed border-gray-300 p-4 rounded">
        <label className="block mb-2">Изображение:</label>
        <label className="inline-flex items-center gap-2 cursor-pointer bg-gray-100 px-4 py-2">
          <FiUpload /> Загрузить изображение
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
        {content.image && (
          <img src={content.image} alt="Preview" className="mt-4 max-h-60 w-full object-contain" />
        )}
      </div>
    </div>
  );
}; 