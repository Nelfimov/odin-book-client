import {useEffect, useState} from 'react';
import '../styles/App.css';
import {Navbar, Footer} from './index';

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
      <Footer />
    </div>
  );
}
