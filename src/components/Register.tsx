import { FormEvent, useRef } from 'react'
import { Data } from '../types'

interface RegisterProps {
  login: () => void
}

/**
 * Register component.
 */
export function Register ({ login }: RegisterProps): JSX.Element {
  const username = useRef<HTMLInputElement>(null)
  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const passwordConfirm = useRef<HTMLInputElement>(null)

  /**
   * Check if everything has been provided.
   */
  function checkInputs (username: string, email: string, password: string, passwordConfirm: string): boolean {
    try {
      if (username === '' && email === '') {
        throw new Error('Username and email are required')
      }
      if (password === '' || passwordConfirm === '') {
        throw new Error('Password and confirm password are required')
      }
      if (password !== passwordConfirm) {
        throw new Error('Passwords do not match')
      }
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  /**
   * Handle submit - sign up and receive token.
   */
  function handleSubmit (e: FormEvent<HTMLFormElement>): void {
    try {
      e.preventDefault()

      const usernameValue = username.current?.value
      const emailValue = email.current?.value
      const passwordValue = password.current?.value
      const passwordConfirmValue = passwordConfirm.current?.value

      if (!checkInputs(
        usernameValue ?? '',
        emailValue ?? '',
        passwordValue ?? '',
        passwordConfirmValue ?? ''
      )) {
        return
      }

      fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: usernameValue,
          email: emailValue,
          password: passwordValue
        })
      })
        .then(async (response) => await response.json())
        .then((data: Data) => {
          const { success, message, token, user } = data
          if (success) {
            localStorage.setItem('token', JSON.stringify(token))
            localStorage.setItem('userID', JSON.stringify(user?._id))
            localStorage.setItem('username', JSON.stringify(user?.username))
            login(); return
          }
          console.log(message)
        })
        .catch((err) => { console.log(err) })
    } catch (err) {
      console.log(err)
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
  )
}
