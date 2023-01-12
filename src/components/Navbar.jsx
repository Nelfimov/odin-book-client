import '../styles/Navbar.css';
import propTypes from 'prop-types';

/**
 * Navbar component
 * @return {JSX} JSX
 */
export default function Navbar({isLoggedIn}) {
  return (
    <header>
      <span className="logo">ODIN-BOOK</span>
      { isLoggedIn ?
      <nav>
        <a href="" className="nav-link">Home</a>
        <a href="" className="nav-link">Profile</a>
        <a href="" className="nav-link">Log out</a>
      </nav> :
      <nav>
        <a href="" className="nav-link">Register</a>
        <a href="" className="nav-link">Login</a>
      </nav>
      }
    </header>
  );
}

Navbar.propTypes = {
  isLoggedIn: propTypes.bool.isRequired,
};
