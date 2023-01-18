import { Data } from '../types'

/**
 * Handle submit to login.
 */
export function authorizeUser (
  username: string | undefined,
  email: string | undefined,
  password: string | undefined,
  login: boolean,
  callback: () => void
): void {
  try {
    let url

    if (login) {
      url = 'http://localhost:3000/auth/login'
    } else {
      url = 'http://localhost:3000/auth/register'
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })
      .then(async (response) => await response.json())
      .then((data: Data) => {
        const { success, message, token, user } = data
        if (success) {
          localStorage.setItem('token', JSON.stringify(token))
          localStorage.setItem('userID', JSON.stringify(user?._id))
          localStorage.setItem('username', JSON.stringify(user?.username))
          callback()
        }
        console.log(message)
      })
      .catch((err) => { console.log(err) })
  } catch (err) {
    console.log(err)
  }
}

/**
 * Check inputs for errors.
 */
export function checkInputs (
  username: string | undefined,
  email: string | undefined,
  password: string | undefined,
  confirmPassword?: string
): boolean {
  try {
    if (username == null || email == null || password == null) {
      throw new Error('Username email or password not provided')
    }

    if (username === '') {
      if (email === '') {
        throw new Error('Username or email are required')
      }
    }
    if (password === '') {
      throw new Error('Password is required')
    }

    if (confirmPassword != null && password !== confirmPassword) {
      throw new Error('Passwords do not match')
    }
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}
