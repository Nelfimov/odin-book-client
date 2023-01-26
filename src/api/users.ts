import { User, Data } from '../types/common';

export async function getUser(
  id: string | undefined
): Promise<User | undefined> {
  try {
    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: JSON.parse(localStorage.getItem('token') ?? ''),
    });
    const response = await fetch(
      `http://localhost:3000/profile/${id ?? '""'}`,
      {
        headers,
      }
    );
    const data: Data = await response.json();
    return data.user;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Send friend request.
 */
export async function sendFriendRequest(
  id: string | undefined
): Promise<boolean> {
  try {
    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: JSON.parse(localStorage.getItem('token') ?? '""'),
    });
    const response = await fetch(
      `http://localhost:3000/profile/${id ?? ''}/request`,
      {
        headers,
      }
    );
    const data: Data = await response.json();
    if (!data.success) {
      console.log(data.message);
    }
    return data.success;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function acceptFriendRequest(id: string): Promise<boolean> {
  try {
    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: JSON.parse(localStorage.getItem('token') ?? '""'),
    });
    const response = await fetch(`http://localhost:3000/profile/${id}/accept`, {
      headers,
    });
    const data = await response.json();
    if (!data.success) {
      console.log(data.message);
    }
    return data.success;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function rejectFriendRequest(id: string): Promise<boolean> {
  try {
    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: JSON.parse(localStorage.getItem('token') ?? '""'),
    });
    const response = await fetch(`http://localhost:3000/profile/${id}/reject`, {
      headers,
    });
    const data = await response.json();
    if (!data.success) {
      console.log(data.message);
    }
    return data.success;
  } catch (err) {
    console.log(err);
    return false;
  }
}
