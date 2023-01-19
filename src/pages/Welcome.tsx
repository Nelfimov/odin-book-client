import { useState } from 'react'
import { Login, Register } from '../components/index'
import '../styles/Welcome.css'

interface WelcomeProps {
  login: () => void
}

/**
 * Welcome page with sign in or sign up options.
 */
export function Welcome ({ login }: WelcomeProps): JSX.Element {
  const [toggle, setToggle] = useState(false)

  return (
    <div className="Welcome">
      <div className="content">
      <button
        className={ toggle ? 'login' : 'register'}
        onClick={() => { setToggle(!toggle) }}
      >
        Change to { toggle ? 'sign in' : 'log in' }
      </button>
      { toggle
        ? <Login login={login} />
        : <Register login={login} />
      }
    </div>
      </div>
  )
}
