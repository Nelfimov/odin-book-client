/**
 * Check if token is valid.
 * @return {shape} Redirect to '/welcome'
 */
export default async function checkToken() {
  const token = localStorage.getItem('token');

  fetch('http://localhost:3000/auth/');
  if (!token) {
    console.log('no token');
  }
}
