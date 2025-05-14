import { useState, useRef } from 'react';
import { FiUpload, FiChevronLeft, FiChevronRight, FiTrash2 } from 'react-icons/fi';

export const AboutEditor = ({ content, setContent }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = [...(content.images || [])];
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          newImages.push(event.target.result);
          setContent({...content, images: newImages});
          if (newImages.length === 1) setActiveIndex(0);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...content.images];
    newImages.splice(index, 1);
    setContent({...content, images: newImages});
    if (activeIndex >= newImages.length && newImages.length > 0) {
      setActiveIndex(newImages.length - 1);
    }
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev > 0 ? prev - 1 : (content.images?.length || 1) - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev < (content.images?.length || 1) - 1 ? prev + 1 : 0));
  };

  const fieldLabels = {
    direction: 'Направление',
    department: 'Учебное подразделение',
    goal: 'Цель'
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        {['direction', 'department', 'goal'].map((field) => (
          <div key={field} className="border-2 border-dashed border-gray-300 p-4 rounded">
            <h3 className="text-30px font-bold mb-2">{fieldLabels[field]}</h3>
            
            {field === 'goal' ? (
              <textarea
                className="w-full bg-transparent outline-none min-h-[100px] font-normal"
                style={{ fontVariationSettings: '"wght" 400' }}
                value={content[field] || ''}
                onChange={(e) => setContent({...content, [field]: e.target.value})}
              />
            ) : (
              <input
                type="text"
                className="w-full bg-transparent outline-none font-normal"
                style={{ fontVariationSettings: '"wght" 400' }}
                value={content[field] || ''}
                onChange={(e) => setContent({...content, [field]: e.target.value})}
              />
            )}
          </div>
        ))}
      </div>

      <div className="border-2 border-dashed border-gray-300 p-4 rounded">
        <div className="space-y-4">
          <div className="absolute inset-0 -z-10">
            <img
              src="/photos/graffiti_1.png"
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <label className="block mb-2">Изображения:</label>
            <label 
              className="inline-flex items-center gap-2 cursor-pointer bg-gray-100 px-4 py-2 mb-4"
              onClick={() => fileInputRef.current.click()}
            >
              <FiUpload /> Добавить изображения
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                multiple
              />
            </label>
          </div>

          {content.images?.length > 0 ? (
            <>
              <div className="relative bg-gray-100 p-4" style={{ 
                backgroundImage: content.bgImage ? `url(${content.bgImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '300px'
              }}>
                <div className="relative z-10 border-4 border-black bg-white p-2 h-full flex items-center">
                  <img 
                    src={content.images[activeIndex]} 
                    alt={`Preview ${activeIndex}`} 
                    className="w-full h-auto max-h-[300px] object-contain mx-auto"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button 
                  onClick={handlePrev}
                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
                >
                  <FiChevronLeft size={20} />
                </button>
                
                <div className="flex-1 flex overflow-x-auto px-4 py-2 space-x-2">
                  {content.images.map((img, index) => (
                    <div key={index} className="relative flex-shrink-0">
                      <img
                        src={img}
                        alt={`Thumbnail ${index}`}
                        className={`w-16 h-16 object-cover cursor-pointer border-2 ${index === activeIndex ? 'border-black' : 'border-gray-300'}`}
                        onClick={() => setActiveIndex(index)}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(index);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        <FiTrash2 size={10} />
                      </button>
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={handleNext}
                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
                >
                  <FiChevronRight size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="text-gray-500 text-center py-8 bg-gray-100">
              Нет загруженных изображений
            </div>
          )}
        </div>
      </div>
    </div>
  );
};