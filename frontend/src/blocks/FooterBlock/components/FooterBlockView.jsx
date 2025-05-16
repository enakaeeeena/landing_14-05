import React from 'react';

const FooterBlockView = ({ content = {} }) => {
  const {
    logo,
    address = 'г. Санкт–Петербург\nм. Невский проспект,\nнаб. реки Мойки, 4В',
    links = [],
    phone = '+7 (812) 571-10-03',
    email = 'icsto@herzen.spb.ru',
  } = content;

  return (
    <footer className="w-full mt-12">
      <div className="w-full flex flex-row items-stretch justify-between px-4 md:px-[100px] py-10 min-h-[220px] border-2 border-black"
        style={{ background: 'linear-gradient(90deg, #030A1B 0%, #183C87 100%)' }}>
        {/* Логотип */}
        <div className="flex items-center justify-center min-w-[180px] max-w-[220px] mr-8">
          {logo ? (
            <img src={logo} alt="Логотип" className="object-contain w-[180px] h-[120px] " />
          ) : (
            <div className="w-[180px] h-[120px] bg-gray-300 rounded" />
          )}
        </div>
        {/* Адрес */}
        <div className="flex flex-col justify-center flex-1 pl-8">
          <div className="text-white text-lg whitespace-pre-line font-normal">
            {address}
          </div>
        </div>
        {/* Ссылки и контакты */}
        <div className="flex flex-col justify-center items-end min-w-[260px] gap-2">
          <div className="flex flex-col items-end gap-1 mb-4">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.url || link.path || '#'}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
                className="text-white text-lg font-bold hover:underline text-right"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="text-white text-base mb-1">{phone}</div>
          <div className="text-white text-base">{email}</div>
        </div>
      </div>
    </footer>
  );
};

export default FooterBlockView; 