import { useState } from 'react';

export const GalleryEditor = ({ content, setContent }) => {
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Здесь будет логика загрузки файла на сервер
      // Временно используем локальный URL
      setContent({
        ...content,
        mainImage: {
          ...content.mainImage,
          url: URL.createObjectURL(file)
        }
      });
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Здесь будет логика загрузки файлов на сервер
      // Временно используем локальные URL
      const newImages = files.map(file => ({
        url: URL.createObjectURL(file),
        title: file.name
      }));

      setContent({
        ...content,
        images: [...(content.images || []), ...newImages]
      });
    }
  };

  return (
    <div className="w-full p-4">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Заголовок</h3>
        <input
          type="text"
          value={content.title || ''}
          onChange={(e) => setContent({ ...content, title: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Введите заголовок"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Основное изображение</h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleMainImageChange}
          className="mb-2"
        />
        {content.mainImage?.url && (
          <div className="relative">
            <img
              src={content.mainImage.url}
              alt="Preview"
              className="w-full h-auto rounded"
            />
            <div className="mt-2">
              <input
                type="text"
                value={content.mainImage.title || ''}
                onChange={(e) => setContent({
                  ...content,
                  mainImage: { ...content.mainImage, title: e.target.value }
                })}
                className="w-full p-2 border rounded mb-2"
                placeholder="Заголовок изображения"
              />
              <textarea
                value={content.mainImage.description || ''}
                onChange={(e) => setContent({
                  ...content,
                  mainImage: { ...content.mainImage, description: e.target.value }
                })}
                className="w-full p-2 border rounded"
                placeholder="Описание изображения"
                rows="3"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Галерея изображений</h3>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImagesChange}
          className="mb-2"
        />
        <div className="grid grid-cols-3 gap-4">
          {content.images?.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-auto rounded"
              />
              <button
                onClick={() => {
                  const newImages = [...content.images];
                  newImages.splice(index, 1);
                  setContent({ ...content, images: newImages });
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 