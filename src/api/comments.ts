import { Data, Comment } from '../types/common';

/**
 * Get comments to post.
 */
export async function getComments(postID: string): Promise<Comment[]> {
  try {
    const token = localStorage.getItem('token');
    if (token == null) return [];

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: JSON.parse(token),
    });
    const response = await fetch(
      `http://localhost:3000/posts/${postID}/comments`,
      {
        headers,
      }
    );
    const data: Data = await response.json();
    return data.comments ? data.comments : [];
  } catch (err) {
    console.log(err);
    return [];
  }
}

/**
 * Create new comment to current post
 */
export async function createComment(
  postID: string,
  text: string
): Promise<boolean> {
  try {
    if (text == null || postID == null) return false;

    const token = localStorage.getItem('token');
    if (token == null) return false;

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: JSON.parse(token),
    });

    const response = await fetch(
      `http://localhost:3000/posts/${postID ?? ''}/comments`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          text,
        }),
      }
    );
    const data: Data = await response.json();
    return data.success;
  } catch (err) {
    console.log(err);
    return false;
  }
}

/**
 * Get comments to post.
 */
export async function getUserComments(userID: string): Promise<Comment[]> {
  try {
    const token = localStorage.getItem('token');
    if (token == null) return [];

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: JSON.parse(token),
    });
    const response = await fetch(
      `http://localhost:3000/profile/${userID ?? '""'}/comments`,
      {
        headers,
      }
    );
    const data: Data = await response.json();
    return data.comments ?? [];
  } catch (err) {
    console.log(err);
    return [];
  }
}
