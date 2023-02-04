import { getUser } from '../api';

export async function loadUser(id: string) {
  if (id) return await getUser(id);
}
