import { useEffect, useState } from 'react';
import { Navbar, Footer } from './components';
import { Outlet, useLocation } from 'react-router-dom';
import { Welcome } from './pages/index';
import './styles/App.css';

/**
 * Main app.
 */
export default function App(): JSX.Element {
  const [isLogged, setIsLogged] = useState(true);
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    const user = localStorage.getItem('token');
    if (user == null) {
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
        if (element != null) element.scrollIntoView();
      }, 100);
    }
  }, [pathname, hash, key]);

  /**
   * Log out.
   */
  function logout(): void {
    localStorage.clear();
    setIsLogged(false);
  }

  /**
   * Log in.
   */
  function login(): void {
    setIsLogged(true);
  }

  return (
    <div className="App" data-testid="App">
      <Navbar isLogged={isLogged} logout={logout} />
      <main>{isLogged ? <Outlet /> : <Welcome login={login} />}</main>
      <Footer />
    </div>
  );
}
