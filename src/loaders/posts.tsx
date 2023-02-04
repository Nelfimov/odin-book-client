import { getPost, getUserPosts } from '../api';

export async function loadPost(id: string) {
  console.log('using loader');
  if (id) {
    console.log(id);
    return await getPost(id);
  }
}

export async function loadUserPosts(id: string) {
  console.log('using loader');
  if (id) {
    console.log(id);
    return await getUserPosts(id);
  }
}
