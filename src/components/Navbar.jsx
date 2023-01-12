import {NavLink} from 'react-router-dom';
import propTypes from 'prop-types';
import '../styles/Navbar.css';

/**
 * Navbar component
 * @param {bool} isLoggedIn Is user logged in.
 * @return {JSX} JSX
 */
export default function Navbar({isLoggedIn}) {
  return (
    <header>
      <span className="logo">ODIN-BOOK</span>
      { isLoggedIn ?
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/profile'>Profile</NavLink>
        <button onClick={() => localStorage.removeItem('token')}>
          Log out
        </button>
      </nav> :
      <nav>
        <a href="https://github.com/nelfimov" className="nav-link">Github</a>
      </nav>
      }
    </header>
  );
}

Navbar.propTypes = {
  isLoggedIn: propTypes.bool.isRequired,
};
