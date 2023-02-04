import { getUser } from '../api';

export async function loadUser(id: string) {
  if (id) return await getUser(id);
}

export async function loadUserFriends() {
  const id = localStorage.getItem('userID');
  if (id) {
    const user = await getUser(JSON.parse(id));
    return user?.friends;
  }
}
