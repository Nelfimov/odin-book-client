import {useRef} from 'react';
import {redirect} from 'react-router-dom';

/**
 * Login component.
 * @return {JSX} Form
 */
export default function Login() {
  const username = useRef();
  const email = useRef();
  const password = useRef();

  /**
   * Check if password is provided, as well as either email or username.
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @return {bool}
   */
  function checkInputs(username, email, password) {
    try {
      if (!username || !email) {
        throw new Error('Username or email are required');
      }
      if (!password) {
        throw new Error('Password is required');
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  /**
   * Handle submit - log in and receive token.
   * @param {shape} e Event object
   */
  function handleSubmit(e) {
    try {
      e.preventDefault();

      const usernameValue = username.current.value;
      const emailValue = email.current.value;
      const passwordValue = password.current.value;

      if (!checkInputs(usernameValue, emailValue, passwordValue)) {
        return;
      }

      fetch('http://localhost:3000/auth/login', {
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
          .then((response) => JSON.parse(response))
          .then((data) => {
            if (data.success) {
              localStorage.setItem('token', JSON.stringify(data.token));
              redirect('/');
              return;
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
      <input
        ref={username}
        type="text"
        name="usernameLogin"
        id="usernameLogin"
      />
      <input
        ref={email}
        type="email"
        name="emailLogin"
        id="emailLogin"
      />
      <input
        ref={password}
        type="password"
        name="passwordLogin"
        id="passwordLogin"
      />
      <button>Log In</button>
    </form>
  );
}
