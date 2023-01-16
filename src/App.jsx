import {useEffect, useState} from 'react';
import {Navbar, Footer} from './components/index';
import {Outlet} from 'react-router-dom';
import {Welcome} from './pages/index';
import './styles/App.css';

/**
 * Main app.
 * @return {JSX} JSX
*/
export default function App() {
  const [isLogged, setIsLogged] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('token');
    if (!user) {
      setIsLogged(false);
    } else {
      setIsLogged(true);
    }
  }, []);

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
