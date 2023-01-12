import {useState} from 'react';
import {Login, Register} from './index';

/**
 * Welcome page with sign in or sign up options.
 * @return {JSX}
 */
export default function Welcome() {
  const [toggle, setToggle] = useState(false);

  /**
   * Toggle which form to display - login or sign up.
   * @return {JSX} Form to display.
   */
  function displayForm() {
    if (toggle) {
      return (
        <>
          <button onClick={() => setToggle(!toggle)}>Change to sign in</button>
          <Login />
        </>
      );
    }
    return (
      <>
        <button onClick={() => setToggle(!toggle)}>Change to log in</button>
        <Register />
      </>
    );
  }

  return (
    <div className="Welcome">
      {displayForm}
    </div>
  );
}
