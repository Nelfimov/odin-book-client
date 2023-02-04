import { getPost } from '../api';

export async function loadPost(id: string) {
  console.log('using loader');
  if (id) {
    console.log(id);
    const post = await getPost(id);
    return post;
  }
}
