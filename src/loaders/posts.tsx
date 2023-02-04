import { getPost, getUserPosts } from '../api';

export async function loadPost(id: string) {
  if (id) return await getPost(id);
}

export async function loadUserPosts(id: string) {
  if (id) return await getUserPosts(id);
}
