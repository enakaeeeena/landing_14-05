import { useRef } from 'react';
import { FiUpload } from 'react-icons/fi';

export const CareerEditor = ({ content, setContent }) => {
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setContent({ ...content, image: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 p-4 rounded">
          <h3 className="text-30px font-bold mb-2">Выпускники могут работать в сферах:</h3>
          <textarea
            className="w-full bg-transparent outline-none min-h-[100px] font-normal"
            style={{ fontVariationSettings: '"wght" 400' }}
            value={content.areas || ''}
            onChange={(e) => setContent({ ...content, areas: e.target.value })}
          />
        </div>
      </div>
      <div className="border-2 border-dashed border-gray-300 p-4 rounded">
        <label className="block mb-2">Изображение:</label>
        <label
          className="inline-flex items-center gap-2 cursor-pointer bg-gray-100 px-4 py-2"
          onClick={() => fileInputRef.current.click()}
        >
          <FiUpload /> Загрузить изображение
          <input
            ref={fileInputRef}
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