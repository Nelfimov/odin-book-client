import {NavLink} from 'react-router-dom';
import propTypes from 'prop-types';
import '../styles/Navbar.css';
import {useEffect} from 'react';

/**
 * Navbar component
 * @param {bool} isLoggedIn Is user logged in.
 * @return {JSX} JSX
 */
export default function Navbar({isLogged, logout}) {
  /**
   * Show menu on click.
   * @param {shape} e Event object.
   */
  function showMenu(e) {
    const nav = document.querySelector('nav');
    nav.className = nav.className === 'hidden' ? 'active' : 'hidden';
  }

  useEffect(() => {
    document.querySelectorAll('nav a, nav button')
        .forEach((element) => {
          element.addEventListener('click', showMenu);
        });
  });

  return (
    <header>
      <div className="header-container">
        <span className="logo">ODIN-BOOK</span>
        { isLogged ?
        <nav className="active">
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/profile'>Profile</NavLink>
          <button onClick={logout}>
            <img src="images/icons/logout.svg" alt="Log out" />
            Log out
          </button>
        </nav> :
        <nav className="active">
          <a href="https://github.com/nelfimov">Github</a>
        </nav>
        }
        <button className="menu" onClick={showMenu}>
          <img src="images/icons/menu.svg" alt="Menu" />
        </button>
      </div>
    </header>
  );
}

Navbar.propTypes = {
  isLogged: propTypes.bool.isRequired,
  logout: propTypes.func.isRequired,
};
