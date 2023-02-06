import { Data, Post } from '../types/common';

/**
 * Like current post.
 */
export async function likePost(id: string): Promise<undefined | boolean> {
  const token = localStorage.getItem('token');
  if (!token) return;
  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: JSON.parse(token),
  });
  const response = await fetch(`/posts/${id}/like`, {
    headers,
  });
  const data: Data = await response.json();
  if (!data.success) {
    console.log(data.message);
    return;
  }
  return data.increasedCount;
}

/**
 * Get posts.
 */
export async function getPosts(
  isCurrentUser: boolean,
  skip: number
): Promise<Post[]> {
  const token = localStorage.getItem('token');
  if (token == null) return [];

  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: JSON.parse(token),
  });

  const url = `/posts/${isCurrentUser ? 'friends' : ''}?skip=${skip}`;
  const response = await fetch(url, {
    headers,
  });
  const data: Data = await response.json();
  return data.posts ?? [];
}

/**
 * Create new post.
 */
export async function createPost(
  title: string,
  text: string
): Promise<boolean> {
  try {
    if (title === '' || text === '') return false;

    const token = localStorage.getItem('token');
    if (token == null) return false;

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: JSON.parse(token),
    });

    const response = await fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title,
        text,
      }),
    });
    const data: Data = await response.json();
    return data.success;
  } catch (err) {
    console.log(err);
    return false;
  }
}

/**
 * Get single post.
 */
export async function getPost(postID: string): Promise<Post | null> {
  try {
    const token = localStorage.getItem('token');
    if (token == null) return null;

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: JSON.parse(token),
    });
    const response = await fetch(`http://localhost:3000/posts/${postID}`, {
      headers,
    });
    const data: Data = await response.json();
    return data.post ? data.post : null;
  } catch (err) {
    console.log(err);
    return null;
  }
}

/**
 * Get posts of user.
 */
export async function getUserPosts(id: string): Promise<Post[]> {
  try {
    const token = localStorage.getItem('token');
    if (token == null) return [];

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: JSON.parse(token),
    });
    const response = await fetch(
      `http://localhost:3000/profile/${id ?? ''}/posts`,
      {
        headers,
      }
    );
    const data: Data = await response.json();
    return data.posts ?? [];
  } catch (err) {
    console.log(err);
    return [];
  }
}
