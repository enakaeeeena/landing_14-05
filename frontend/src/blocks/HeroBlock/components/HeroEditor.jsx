import { useRef } from "react";

export const HeroEditor = ({ 
  title,
  setTitle,
  subtitle,
  setSubtitle,
  image, 
  setImage,
  tickerText,
  setTickerText
}) => {
  const fileInputRef = useRef(null);
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="border-2 border-gray-300 p-4">
        <label htmlFor="hero-title" className="block mb-2">Заголовок:</label>
        <input
          id="hero-title"
          name="hero-title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-2 border-2 border-gray-300 mb-4"
        />

        <label htmlFor="hero-subtitle" className="block mb-2">Подзаголовок:</label>
        <input
          id="hero-subtitle"
          name="hero-subtitle"
          type="text"
          value={subtitle}
          onChange={e => setSubtitle(e.target.value)}
          className="w-full p-2 border-2 border-gray-300 mb-4"
        />

        <label className="block mb-2">Основное изображение:</label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
        <button
          type="button"
          onClick={triggerFileInput}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
        >
          Выбрать изображение
        </button>
        {image && (
          <div className="mt-2">
            <img 
              src={image} 
              alt="Preview" 
              className="max-h-40 max-w-full" 
            />
            <button
              type="button"
              onClick={() => setImage('')}
              className="mt-2 text-red-500 text-sm"
            >
              Удалить изображение
            </button>
          </div>
        )}
      </div>
      <div className="border-2 border-gray-300 p-4">
        <label htmlFor="hero-ticker" className="block mb-2">Текст бегущей строки:</label>
        <textarea
          id="hero-ticker"
          name="hero-ticker"
          value={tickerText}
          onChange={e => setTickerText(e.target.value)}
          className="w-full p-2 border-2 border-gray-300 min-h-[100px]"
          placeholder="Введите текст для бегущей строки (разделите хэштеги пробелами)"
        />
      </div>
    </div>
  );
};