import { Data, Post } from '../types/common';

/**
 * Like current post.
 */
export function likePost(
  postID: string,
  liked: boolean,
  likedCallback: (arg: boolean) => void,
  post: Post,
  postCallback: (arg: Post) => void
): void {
  const token = localStorage.getItem('token');
  if (token == null) return;

  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: JSON.parse(token),
  });

  fetch(`http://localhost:3000/posts/${postID}/like`, {
    headers,
  })
    .then(async (response) => await response.json())
    .then((data: Data) => {
      if (!data.success) {
        console.log(data.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  let newPost: Post;
  if (liked) {
    newPost = {
      ...post,
      [post.likes.count]: --post.likes.count,
    };
  } else {
    newPost = {
      ...post,
      [post.likes.count]: ++post.likes.count,
    };
  }
  likedCallback(!liked);
  postCallback(newPost);
}

/**
 * Get posts.
 */
export async function getPosts(isCurrentUser: boolean): Promise<Post[]> {
  const token = localStorage.getItem('token');
  if (token == null) return [];

  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: JSON.parse(token),
  });

  const url = `http://localhost:3000/posts/${isCurrentUser ? 'friends' : ''}`;
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
