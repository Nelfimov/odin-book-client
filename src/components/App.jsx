import {useEffect, useState} from 'react';
import {Navbar, Footer} from './index';
import {Outlet, useNavigate} from 'react-router-dom';
import '../styles/App.css';

/**
 * Main app.
 * @return {JSX} JSX
 */
export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    } else {
      navigate('/welcome');
    }
  }, []);

  return (
    <div className="App" data-testid='App'>
      <Navbar isLoggedIn={isLoggedIn} />
      <Outlet />
      <Footer />
    </div>
  );
}
