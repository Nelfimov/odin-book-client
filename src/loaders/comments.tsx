import { getComments, getUserComments } from '../api';

export async function loadComments(id: string) {
  if (id) return await getComments(id);
}

export async function loadUserComments(id: string) {
  if (id) return await getUserComments(id);
}
