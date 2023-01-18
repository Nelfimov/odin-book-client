import { FormEvent, useRef } from 'react'
import { Data } from '../types'

interface LoginProps {
  login: () => void
}

/**
 * Login component.
 */
export function Login ({ login }: LoginProps): JSX.Element {
  const username = useRef<HTMLInputElement>(null)
  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)

  /**
   * Check if password is provided, as well as either email or username.
   */
  function checkInputs (username: string, email: string, password: string): boolean {
    try {
      if (username === '') {
        if (email === '') {
          throw new Error('Username or email are required')
        }
      }
      if (password === '') {
        throw new Error('Password is required')
      }
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  /**
   * Handle submit - log in and receive token.
   */
  function handleSubmit (e: FormEvent<HTMLFormElement>): void {
    try {
      e.preventDefault()

      const usernameValue = username.current?.value
      const emailValue = email.current?.value
      const passwordValue = password.current?.value

      if (!checkInputs(
        usernameValue ?? '',
        emailValue ?? '',
        passwordValue ?? ''
      )) {
        return
      }

      fetch('http://localhost:3000/auth/login', {
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
        <label htmlFor="usernameLogin">Username</label>
        <input
          ref={username}
          type="text"
          name="usernameLogin"
          id="usernameLogin"
        />
      </div>
      <div className="input">
        <label htmlFor="emailLogin">Email</label>
        <input
          ref={email}
          type="email"
          name="emailLogin"
          id="emailLogin"
        />
      </div>
      <div className="input">
        <label htmlFor="passwordLogin">Password</label>
        <input
          ref={password}
          type="password"
          name="passwordLogin"
          id="passwordLogin"
          required
        />
      </div>
      <button>Log In</button>
    </form>
  )
}
