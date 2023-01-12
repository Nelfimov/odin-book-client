import {useState} from 'react';
import {Login, Register} from './index';

/**
 * Welcome page with sign in or sign up options.
 * @return {JSX}
 */
export function Welcome() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="Welcome">
      <button
        className={ toggle ? 'login' : 'register'}
        onClick={() => setToggle(!toggle)}
      >
        Change to { toggle ? 'sign in' : 'log in' }
      </button>
      { toggle ?
        <Login /> :
        <Register />
      }
    </div>
  );
}
