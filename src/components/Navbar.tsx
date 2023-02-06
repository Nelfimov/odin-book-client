import { NavLink, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/Navbar.css';

interface NavbarProps {
  isLogged: boolean;
  logout: () => void;
}

/**
 * Navbar component
 */
export function Navbar({ isLogged, logout }: NavbarProps): JSX.Element {
  const [showMenu, setShowMenu] = useState(false);

  function getUserName(): string {
    const username = localStorage.getItem('username');
    if (username !== null) return JSON.parse(username);
    return '';
  }

  function getUserID(): string {
    const userID = localStorage.getItem('userID');
    if (userID !== null) return JSON.parse(userID);
    return '';
  }

  useEffect(() => {
    const anchors = document.querySelectorAll('nav a');
    const buttons = document.querySelectorAll('nav button');

    anchors.forEach((element) => {
      element.addEventListener('click', () => setShowMenu(false));
    });
    buttons.forEach((element) => {
      element.addEventListener('click', () => setShowMenu(false));
      element.addEventListener('touchend', () => setShowMenu(false));
    });
  }, []);

  useEffect(() => {
    const nav = document.querySelector('header nav');
    if (nav === null) return;
    showMenu ? (nav.className = 'active') : (nav.className = 'hidden');
  }, [showMenu]);

  return (
    <header>
      <div className="header-container">
        <span className="logo">
          <Link to="/">ODIN BOOK</Link>
        </span>
        {isLogged ? (
          <nav className="hidden">
            <NavLink to="/">
              <img src="/images/icons/home.svg" alt="home" />
              Home
            </NavLink>
            <NavLink to="/posts/discover">
              <img src="/images/icons/discover.svg" alt="discover" />
              Discover
            </NavLink>
            <NavLink to="/posts/new">
              <img src="/images/icons/new-post.svg" alt="new-post" />
              New
            </NavLink>
            <NavLink to={`/profile/${getUserID()}`}>
              <img src="/images/icons/profile.svg" alt="profile" />
              {getUserName()}
            </NavLink>
            <NavLink to={`/profile/friends`}>
              <img src="/images/icons/friends.svg" alt="friends" />
              Your friends
            </NavLink>
            <button onClick={logout}>
              <img src="/images/icons/logout.svg" alt="Log out" />
              Log out
            </button>
          </nav>
        ) : (
          <nav className="hidden">
            <a href="https://github.com/nelfimov">Github</a>
          </nav>
        )}
        <label className="toggle">
          <input
            type="checkbox"
            id="menu"
            onChange={() => setShowMenu(!showMenu)}
          />
          <img src="/images/icons/menu.svg" alt="Menu" />
        </label>
      </div>
    </header>
  );
}
