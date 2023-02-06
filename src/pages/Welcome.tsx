import { useState } from 'react';
import { Login, Register } from '../components';
import '../styles/Welcome.css';
import { Data } from '../types/common/';

interface WelcomeProps {
  login: () => void;
}

/**
 * Welcome page with sign in or sign up options.
 */
export function Welcome({ login }: WelcomeProps): JSX.Element {
  const [toggle, setToggle] = useState(false);

  function handleClick() {
    fetch('/auth/demo')
      .then((result) => result.json())
      .then((data: Data) => {
        if (!data.success) {
          console.log(data);
          return;
        }
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('userID', JSON.stringify(data.user?._id));
        localStorage.setItem('username', JSON.stringify(data.user?.username));
        login();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="Welcome">
      <div className="content">
        <label className="toggle">
          <input type="checkbox" onChange={() => setToggle(!toggle)} />
          <span
            className="labels"
            data-on="Change to login"
            data-off="Change to register"
          ></span>
        </label>
        {toggle ? <Login login={login} /> : <Register login={login} />}
        <button type="button" onClick={handleClick}>
          DEMO
        </button>
      </div>
    </div>
  );
}
