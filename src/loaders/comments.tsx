import { getComments } from '../api';

export async function loadComments(id: string) {
  console.log('using loader');
  if (id) {
    console.log(id);
    return await getComments(id);
  }
}
