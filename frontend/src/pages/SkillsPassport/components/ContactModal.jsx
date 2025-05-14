import React from 'react';

const ContactModal = ({ user, onClose }) => {
  const { telegram, vkontakte, email, phone, preferredTime } = user.contact || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl relative flex flex-col md:flex-row gap-6">
        {/* Кнопка закрытия */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Левая часть */}
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-sm text-gray-500">Telegram</p>
            <p className="text-base text-gray-800">{telegram || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">ВКонтакте</p>
            <p className="text-base text-gray-800">{vkontakte || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-base text-gray-800">{email || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Телефон</p>
            <p className="text-base text-gray-800">{phone || '—'}</p>
          </div>
        </div>

        {/* Правая часть */}
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">Когда лучше писать?</p>
          <div className="text-base text-gray-800 h-full whitespace-pre-line">
            {preferredTime || '—'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
