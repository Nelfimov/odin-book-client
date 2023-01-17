import {useEffect, useState} from 'react';
import {Navbar, Footer} from './components/index';
import {Outlet, useLocation} from 'react-router-dom';
import {Welcome} from './pages/index';
import './styles/App.css';

/**
 * Main app.
 * @return {JSX} JSX
*/
export default function App() {
  const [isLogged, setIsLogged] = useState(true);
  const {pathname, hash, key} = useLocation();

  useEffect(() => {
    const user = localStorage.getItem('token');
    if (!user) {
      setIsLogged(false);
    } else {
      setIsLogged(true);
    }
  }, []);

  useEffect(() => {
    if (hash === '') {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView();
      }, 100);
    }
  }, [pathname, hash, key]);

  /**
   * Log out.
   */
  function logout() {
    localStorage.clear();
    setIsLogged(false);
  }

  /**
   * Log in.
   */
  function login() {
    setIsLogged(true);
  }

  return (
    <div className="App" data-testid='App'>
      <Navbar isLogged={isLogged} logout={logout} />
      <main>
        { isLogged ? <Outlet /> : <Welcome login={login} />}
      </main>
      <Footer />
    </div>
  );
}
