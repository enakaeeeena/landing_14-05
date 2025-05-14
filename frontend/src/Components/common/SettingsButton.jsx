import { FiSettings } from 'react-icons/fi';

import { useAdmin } from '../../pages/admin/context/AdminContext'; 

const SettingsButton = () => {
  const { isAdmin } = useAdmin();

  return (
    <div className="pl-4 border-l-2 border-gray-200 bg-white z-10">
      {isAdmin && (
        <button
          className="p-1 hover:rotate-45 transition-transform"
          onClick={() => {
            const event = new CustomEvent('openHeaderSettings', {
              bubbles: true,
              composed: true
            });
            document.dispatchEvent(event);
          }}
          aria-label="Open settings"
        >
          <FiSettings className="w-6 h-6 md:w-7 md:h-7 text-text hover:text-primary" />
        </button>
      )}
    </div>
  );
};

export default SettingsButton;
