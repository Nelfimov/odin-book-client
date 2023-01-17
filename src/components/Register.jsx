import {useRef} from 'react';
import propTypes from 'prop-types';

/**
 * Register component.
 * @return {JSX} Form
 */
export default function Register({login}) {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirm = useRef();

  /**
   * Check if everything has been provided.
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @param {string} passwordConfirm
   * @return {bool}
   */
  function checkInputs(username, email, password, passwordConfirm) {
    try {
      if (!username && !email) {
        throw new Error('Username and email are required');
      }
      if (!password || !passwordConfirm) {
        throw new Error('Password and confirm password are required');
      }
      if (password !== passwordConfirm) {
        throw new Error('Passwords do not match');
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  /**
   * Handle submit - sign up and receive token.
   * @param {shape} e Event object
   */
  function handleSubmit(e) {
    try {
      e.preventDefault();

      const usernameValue = username.current.value;
      const emailValue = email.current.value;
      const passwordValue = password.current.value;
      const passwordConfirmValue = passwordConfirm.current.value;

      if (!checkInputs(
          usernameValue,
          emailValue,
          passwordValue,
          passwordConfirmValue,
      )) {
        return;
      }

      fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: usernameValue,
          email: emailValue,
          password: passwordValue,
        }),
      })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              localStorage.setItem('token', JSON.stringify(data.token));
              return login();
            }
            console.log(data.message);
          })
          .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input">
        <label htmlFor="usernameRegister">Username</label>
        <input
          ref={username}
          type="text"
          name="usernameRegister"
          id="usernameRegister"
          required
        />
      </div>
      <div className="input">
        <label htmlFor="emailRegister">Email</label>
        <input
          ref={email}
          type="email"
          name="emailRegister"
          id="emailRegister"
          required
        />
      </div>
      <div className="input password-register">
        <label htmlFor="passwordRegister">Password</label>
        <input
          ref={password}
          type="password"
          name="passwordRegister"
          id="passwordRegister"
          required
        />
      </div>
      <div className="input password-register">
        <label htmlFor="passwordConfirmRegister">Confirm password</label>
        <input
          ref={passwordConfirm}
          type="password"
          name="passwordConfirmRegister"
          id="passwordConfirmRegister"
          required
        />
      </div>
      <button>Sign Up</button>
    </form>
  );
}

Register.propTypes = {
  login: propTypes.func,
};
