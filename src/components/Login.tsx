import { FormEvent, useRef } from 'react'
import { authorizeUser, checkInputs } from '../api'

interface LoginProps {
  login: () => void
}

export function Login ({ login }: LoginProps): JSX.Element {
  const username = useRef<HTMLInputElement>(null)
  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)

  function handleSubmit (e: FormEvent<HTMLFormElement>): void {
    try {
      e.preventDefault()

      const usernameValue = username.current?.value
      const emailValue = email.current?.value
      const passwordValue = password.current?.value

      const checkResult = checkInputs(
        usernameValue, emailValue, passwordValue
      )
      if (checkResult) {
        authorizeUser(
          usernameValue,
          emailValue,
          passwordValue,
          true,
          login
        )
      } else {
        console.log('error')
      }
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
