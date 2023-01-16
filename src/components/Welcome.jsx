import {useState} from 'react';
import {Login, Register} from './index';
import propTypes from 'prop-types';
import '../styles/Welcome.css';

/**
 * Welcome page with sign in or sign up options.
 * @return {JSX}
 */
export default function Welcome({login}) {
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
        <Login login={login} /> :
        <Register login={login} />
      }
    </div>
  );
}

Welcome.propTypes = {
  login: propTypes.func,
};
