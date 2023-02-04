import { getComments, getUserComments } from '../api';

export async function loadComments(id: string) {
  console.log('using loader');
  if (id) {
    console.log(id);
    return await getComments(id);
  }
}

export async function loadUserComments(id: string) {
  console.log('using loader');
  if (id) {
    console.log(id);
    return await getUserComments(id);
  }
}
