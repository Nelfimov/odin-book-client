import { getUser } from '../api';

export async function loadUser(id: string) {
  console.log('using loader');
  if (id) {
    console.log(id);
    const user = await getUser(id);
    return user;
  }
}
