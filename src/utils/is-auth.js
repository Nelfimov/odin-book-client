import {redirect} from 'react-router-dom';

/**
 * Check if local storage has token.
 * @return {shape} Redirect to '/welcome'
 */
export default function isAuth() {
  const token = localStorage.getItem('token');

  if (!token) return redirect('/welcome');
}
