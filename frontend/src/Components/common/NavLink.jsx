import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavLink = ({ link, currentPath }) => (
  <Link
    to={link.path}
    className={`
      font-bold
      text-base md:text-lg lg:text-xl
      whitespace-nowrap
      pb-1
      border-b-2
      transition-all
      duration-300
      flex-1 text-center
      ${currentPath === link.path
        ? 'border-black text-primary'
        : 'border-transparent hover:border-gray-400 text-text'}
    `}
    style={{ 
      fontFamily: "'YFF Rare', sans-serif",
      fontVariationSettings: '"wght" 700'
    }}
  >
    {link.label}
  </Link>
);
export default NavLink