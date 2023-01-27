import { Data } from '../types/common';

/**
 * Handle submit to login.
 */
export function authorizeUser(
  username: string,
  email: string,
  password: string,
  login: boolean,
  callback: () => void
): void {
  try {
    let url;

    if (login) {
      url = 'http://localhost:3000/auth/login';
    } else {
      url = 'http://localhost:3000/auth/register';
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
      .then(async (response) => await response.json())
      .then((data: Data) => {
        const { success, message, token, user } = data;
        if (success) {
          localStorage.setItem('token', JSON.stringify(token));
          localStorage.setItem('userID', JSON.stringify(user?._id));
          localStorage.setItem('username', JSON.stringify(user?.username));
          callback();
          return;
        }
        console.log(message);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
}

/**
 * Check inputs for errors.
 */
export function checkInputs(
  username: string,
  email: string,
  password: string,
  confirmPassword?: string
): boolean {
  try {
    if (username === '') {
      if (email === '') {
        return false;
      }
    }
    if (password === '') {
      return false;
    }

    if (confirmPassword != null && password !== confirmPassword) {
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
