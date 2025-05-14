import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import NavLink from './common/NavLink';
import PropTypes from 'prop-types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAdmin } from '../pages/admin/context/AdminContext';

const removeDuplicateLinks = (links) => {
  const uniquePaths = new Set();
  return links.filter(link => {
    if (!uniquePaths.has(link.path)) {
      uniquePaths.add(link.path);
      return true;
    }
    console.warn(`Дубликат пути удален: ${link.path}`);
    return false;
  });
};

const Header = ({ links, setHeaderLinks }) => {
  const location = useLocation();
  const { isAdmin } = useAdmin();
  const [headerLinksLocal, setHeaderLinksLocal] = useLocalStorage('headerLinks', links);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredLinks = removeDuplicateLinks(headerLinksLocal);

  const getGapStyle = () => {
    const count = filteredLinks.length;
    if (count <= 3) return 'gap-12';
    if (count <= 5) return 'gap-8';
    return 'gap-4';
  };

  const handleSaveHeader = (newLinks) => {
    const uniqueLinks = Array.from(new Set(newLinks.map(l => l.path)))
      .map(path => newLinks.find(l => l.path === path));
    
    setHeaderLinksLocal(uniqueLinks);
    setHeaderLinks?.(uniqueLinks);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="w-full border-t-4 border-b-4 border-black">
      <nav className="w-full min-h-[6rem] flex items-center justify-between px-4 md:px-[100px] py-2 relative">
        <button 
          className="md:hidden p-2 text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className="hidden md:flex flex-1 justify-between items-center">
          {filteredLinks.length > 0 ? (
            <div className={`w-full flex flex-wrap justify-center items-center ${getGapStyle()} gap-y-4`}>
              {filteredLinks.map((link) => (
                <NavLink 
                  key={`${link.path}-${link.label}`} 
                  link={link}
                  currentPath={location.pathname}
                  className="mx-1 px-3 py-1.5"
                />
              ))}
            </div>
          ) : (
            <div className="text-gray-400">
              {links.length === 0 ? "No links provided" : "All links were duplicates"}
            </div>
          )}
        </div>

        <div className={`md:hidden fixed top-24 left-0 w-full h-[calc(100vh-6rem)] bg-white z-50 transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col p-4 space-y-4">
            {filteredLinks.map((link) => (
              <NavLink 
                key={`mobile-${link.path}-${link.label}`} 
                link={link}
                currentPath={location.pathname}
                className="text-xl py-2 border-b border-gray-200"
                onClick={() => setIsMenuOpen(false)}
              />
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

Header.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  setHeaderLinks: PropTypes.func
};

export default Header;