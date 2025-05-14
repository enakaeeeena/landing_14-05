import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';

const CurriculumBlockEditor = ({ content = { images: [], theoretical: { left: '', right: '' }, practical: '' }, setContent }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [resizingItem, setResizingItem] = useState(null);
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const dropZoneRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newImages = [];
    let processedCount = 0;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        newImages.push({
          url: event.target.result,
          x: 50,
          y: 50,
          width: 200,
          height: 200
        });
        
        processedCount++;
        if (processedCount === files.length) {
          const updatedImages = [...(content.images || []), ...newImages].slice(0, 3);
          setContent({
            ...content,
            images: updatedImages
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleTextChange = (section, value) => {
    const newContent = {
      ...content,
      [section]: value
    };
    setContent(newContent);
  };

  const handleResizeStart = (index, e) => {
    e.stopPropagation();
    e.preventDefault();
    setResizingItem(index);
    setStartSize({
      width: content.images[index].width,
      height: content.images[index].height
    });
    setStartPos({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleResize = useCallback((e) => {
    if (resizingItem === null) return;

    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    
    const updatedImages = [...content.images];
    const newWidth = Math.max(100, Math.min(400, startSize.width + deltaX));
    const newHeight = Math.max(100, Math.min(400, startSize.height + deltaY));
    
    updatedImages[resizingItem] = {
      ...updatedImages[resizingItem],
      width: newWidth,
      height: newHeight
    };
    
    setContent({ ...content, images: updatedImages });
  }, [content, resizingItem, startPos, startSize, setContent]);

  const handleResizeEnd = useCallback(() => {
    setResizingItem(null);
  }, []);

  useEffect(() => {
    if (resizingItem !== null) {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', handleResizeEnd);
      return () => {
        window.removeEventListener('mousemove', handleResize);
        window.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [resizingItem, handleResize, handleResizeEnd]);

  const handleDragStart = (index, e) => {
    if (resizingItem !== null) return;
    setDraggedItem(index);
    e.dataTransfer.setDragImage(new Image(), 0, 0);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (draggedItem === null || !dropZoneRef.current) return;

    const container = dropZoneRef.current.getBoundingClientRect();
    const x = ((e.clientX - container.left) / container.width) * 100;
    const y = ((e.clientY - container.top) / container.height) * 100;

    const updatedImages = [...content.images];
    updatedImages[draggedItem] = { 
      ...updatedImages[draggedItem], 
      x: Math.max(0, Math.min(100, x)), 
      y: Math.max(0, Math.min(100, y)) 
    };
    
    setContent({ ...content, images: updatedImages });
    setDraggedItem(null);
  };

  const handleDrag = useCallback((index, e) => {
    if (!content.images || !dropZoneRef.current || resizingItem !== null) return;
    
    const container = dropZoneRef.current.getBoundingClientRect();
    const x = ((e.clientX - container.left) / container.width) * 100;
    const y = ((e.clientY - container.top) / container.height) * 100;

    const updatedImages = [...content.images];
    updatedImages[index] = { 
      ...updatedImages[index], 
      x: Math.max(0, Math.min(100, x)), 
      y: Math.max(0, Math.min(100, y)) 
    };
    setContent({ ...content, images: updatedImages });
  }, [content, setContent, resizingItem]);

  return (
    <section className="relative w-full">
      <div className="relative w-full">
        <img 
          src="/photos/plan_back.png"
          alt="Фон"
          className="w-full h-auto object-contain"
        />

        <div className="absolute inset-0">
          <div 
            ref={dropZoneRef}
            className="relative w-full h-full"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <label className="absolute top-4 right-4 z-50 p-4 flex items-center gap-2 cursor-pointer text-white bg-black/30 rounded-lg hover:bg-black/40 transition-colors">
              <FiUpload />
              Загрузить фото (макс. 3)
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={(content.images?.length || 0) >= 3}
              />
            </label>

            {content.images?.map((img, index) => (
              <div
                key={index}
                className="absolute p-2 shadow-lg cursor-move bg-white/10 backdrop-blur-sm rounded z-40"
                draggable
                onDragStart={(e) => handleDragStart(index, e)}
                onDrag={(e) => handleDrag(index, e)}
                style={{
                  left: `${img.x}%`,
                  top: `${img.y}%`,
                  width: `${img.width}px`,
                  height: `${img.height}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <img
                  src={img.url}
                  alt={`Дисциплина ${index + 1}`}
                  className="w-full h-full object-contain"
                />
                <div className="absolute -top-2 -right-2 z-50">
                  <button
                    onClick={() => {
                      const filtered = content.images.filter((_, i) => i !== index);
                      setContent({ ...content, images: filtered });
                    }}
                    className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <FiX size={16} />
                  </button>
                </div>
                <div 
                  className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize z-50"
                  onMouseDown={(e) => handleResizeStart(index, e)}
                >
                  <div className="w-full h-full border-b-2 border-r-2 border-white"></div>
                </div>
              </div>
            ))}

            <div className="container mx-auto h-full relative z-10">
              <h2 className="text-8xl font-bold mb-9 pt-8">Учебный план</h2>
              <div className="flex h-full">
                <div className="w-1/2 pr-4 py-16 pl-8">
                  <div className="space-y-8">
                    <div className="p-6">
                      <h3 className="text-3xl font-bold mb-4 text-white">Теоретические дисциплины</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 text-xl">
                          <textarea 
                            className="w-full p-2 mb-2 bg-transparent text-white border border-white/30 rounded"
                            value={content.theoretical?.left || ''}
                            onChange={(e) => handleTextChange('theoretical', { ...content.theoretical, left: e.target.value })}
                            placeholder="· История дизайна\n· Теория композиции"
                          />
                        </div>
                        <div className="space-y-2 text-xl">
                          <textarea 
                            className="w-full p-2 mb-2 bg-transparent text-white border border-white/30 rounded"
                            value={content.theoretical?.right || ''}
                            onChange={(e) => handleTextChange('theoretical', { ...content.theoretical, right: e.target.value })}
                            placeholder="· Цветоведение\n· Типографика"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-3xl font-bold mb-4 text-white">Практические модули</h3>
                      <div className="space-y-2 text-xl">
                        <textarea
                          className="w-full p-2 mb-2 bg-transparent text-white border border-white/30 rounded"
                          value={content.practical || ''}
                          onChange={(e) => handleTextChange('practical', e.target.value)}
                          placeholder="· Веб-дизайн\n· 3D-моделирование\n· Проектная работа"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurriculumBlockEditor;