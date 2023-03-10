import { useEffect, useState } from 'react';
import { Navbar, Footer } from './components';
import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import { Welcome } from './pages/index';
import './styles/App.css';

/**
 * Main app.
 */
export default function App(): JSX.Element {
  const [isLogged, setIsLogged] = useState(true);
  const { pathname, hash, key } = useLocation();
  const navigation = useNavigation();

  useEffect(() => {
    const user = localStorage.getItem('token');
    user ? setIsLogged(true) : setIsLogged(false);
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
      <div
        id="transition"
        className={navigation.state === 'loading' ? 'loading' : ''}
      ></div>
      <main>{isLogged ? <Outlet /> : <Welcome login={login} />}</main>
      <Footer />
    </div>
  );
}
