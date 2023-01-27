import { FormEvent, useRef } from 'react';
import { authorizeUser, checkInputs } from '../api';

interface RegisterProps {
  login: () => void;
}

export function Register({ login }: RegisterProps): JSX.Element {
  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const passwordConfirm = useRef<HTMLInputElement>(null);

  /**
   * Handle submit - sign up and receive token.
   */
  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    try {
      e.preventDefault();

      const usernameValue = username.current?.value;
      const emailValue = email.current?.value;
      const passwordValue = password.current?.value;
      const passwordConfirmValue = passwordConfirm.current?.value;

      if (
        !usernameValue ||
        !emailValue ||
        !passwordValue ||
        !passwordConfirmValue
      )
        return;

      const checkResult = checkInputs(
        usernameValue,
        emailValue,
        passwordValue,
        passwordConfirmValue
      );
      if (checkResult) {
        authorizeUser(usernameValue, emailValue, passwordValue, false, login);
      }
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
