import {useEffect, useState} from 'react';
import {Navbar, Footer} from './index';
import {RouterProvider} from 'react-router-dom';
import {router} from '../config';
import '../styles/App.css';

/**
 * Main app.
 * @return {JSX} JSX
 */
export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return setLoggedIn(false);
    setLoggedIn(true);
  }, []);

  return (
    <div className="App" data-testid='App'>
      <Navbar isLoggedIn={isLoggedIn} />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}
