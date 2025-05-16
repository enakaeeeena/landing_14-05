import React, { useRef } from 'react';

const FooterBlockEditor = ({ content = {}, setContent, onSave }) => {
  const fileInputRef = useRef();
  const { logo, address = '', links = [], phone = '', email = '' } = content;

  const handleLogoChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setContent({ ...content, logo: ev.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setContent({ ...content, logo: '' });
  };

  const handleLinkChange = (idx, field, value) => {
    const newLinks = links.map((l, i) => i === idx ? { ...l, [field]: value } : l);
    setContent({ ...content, links: newLinks });
  };

  const handleAddLink = () => {
    setContent({ ...content, links: [...links, { label: '', url: '', isExternal: false }] });
  };

  const handleRemoveLink = idx => {
    setContent({ ...content, links: links.filter((_, i) => i !== idx) });
  };

  const handleSave = () => {
    if (onSave) {
      onSave(content);
    }
  };

  return (
    <footer className="w-full mt-12">
      <div className="w-full flex flex-row items-stretch justify-between px-4 md:px-[100px] py-10 min-h-[220px] border-2 border-black rounded-xl shadow-lg bg-white"
        style={{ background: 'linear-gradient(90deg, #030A1B 0%, #183C87 100%)' }}>
        {/* Логотип */}
        <div className="flex flex-col items-center justify-center min-w-[180px] max-w-[220px] mr-8">
          {logo ? (
            <>
              <img src={logo} alt="Логотип" className="object-contain w-[180px] h-[120px] bg-white rounded mb-2" />
              <button onClick={handleRemoveLogo} className="text-red-500 text-xs mb-2">Удалить</button>
            </>
          ) : (
            <button onClick={() => fileInputRef.current.click()} className="w-[180px] h-[120px] bg-gray-300 rounded flex items-center justify-center text-gray-600">Загрузить</button>
          )}
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleLogoChange}
          />
        </div>
        {/* Адрес */}
        <div className="flex flex-col justify-center flex-1 pl-8 pr-8">
          <textarea
            className="text-black text-lg bg-white outline-none resize-vertical font-normal w-full min-h-[120px] border-2 border-gray-300 rounded-lg p-3 mb-4 shadow"
            value={address}
            onChange={e => setContent({ ...content, address: e.target.value })}
            placeholder="Адрес..."
          />
        </div>
        {/* Ссылки и контакты */}
        <div className="flex flex-col justify-center items-end min-w-[260px] gap-4">
          <div className="flex flex-col items-end gap-1 mb-4 w-full">
            {links.map((link, idx) => (
              <div key={idx} className="flex gap-2 items-center w-full mb-1">
                <input
                  className="flex-1 bg-transparent border-b-2 border-white text-white px-2 outline-none"
                  value={link.label}
                  onChange={e => handleLinkChange(idx, 'label', e.target.value)}
                  placeholder="Название ссылки"
                />
                <input
                  className="flex-1 bg-transparent border-b-2 border-white text-white px-2 outline-none"
                  value={link.url}
                  onChange={e => handleLinkChange(idx, 'url', e.target.value)}
                  placeholder="URL или /путь"
                />
                <label className="text-xs text-white flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={!!link.isExternal}
                    onChange={e => handleLinkChange(idx, 'isExternal', e.target.checked)}
                  />
                  Внешняя
                </label>
                <button onClick={() => handleRemoveLink(idx)} className="text-red-400 text-lg ml-2">✕</button>
              </div>
            ))}
            <button onClick={handleAddLink} className="text-white border-2 border-white px-3 py-1 mt-2">Добавить ссылку</button>
          </div>
          <input
            className="text-white text-base bg-transparent border-b-2 border-white px-2 outline-none mb-1 w-full text-right"
            value={phone}
            onChange={e => setContent({ ...content, phone: e.target.value })}
            placeholder="Телефон"
          />
          <input
            className="text-white text-base bg-transparent border-b-2 border-white px-2 outline-none w-full text-right"
            value={email}
            onChange={e => setContent({ ...content, email: e.target.value })}
            placeholder="Почта"
          />
        </div>
      </div>
      {/* Кнопка сохранения */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-[#0C3281] text-white rounded hover:bg-[#0a2a6d] font-bold"
        >
          Сохранить изменения
        </button>
      </div>
    </footer>
  );
};

export default FooterBlockEditor; 