import { User, Data } from '../types/common';
import imageCompression from 'browser-image-compression';

export async function getUser(id: string): Promise<User | undefined> {
  try {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: JSON.parse(token),
    });
    const response = await fetch(`http://localhost:3000/profile/${id}`, {
      headers,
    });
    const data: Data = await response.json();
    return data.user;
  } catch (err) {
    console.log(err);
    return;
  }
}

/**
 * Send friend request.
 */
export async function sendFriendRequest(id: string): Promise<boolean> {
  try {
    const token = localStorage.getItem('token');
    if (token == null) return false;

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: JSON.parse(token),
    });
    const response = await fetch(
      `http://localhost:3000/profile/${id}/request`,
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
    const token = localStorage.getItem('token');
    if (token == null) return false;

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: JSON.parse(token),
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
    const token = localStorage.getItem('token');
    if (token == null) return false;

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: JSON.parse(token),
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

export async function uploadImage(id: string, file: File): Promise<boolean> {
  try {
    const token = localStorage.getItem('token');
    if (token == null) return false;

    const headers = new Headers({
      Authorization: JSON.parse(token),
    });

    const form = new FormData();
    const compressOptions = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(file, compressOptions);
    form.append('image', compressedFile, `${id}.${file.type.split('/')[1]}`);
    const response = await fetch(`http://localhost:3000/profile/${id}/upload`, {
      method: 'PATCH',
      headers: headers,
      body: form,
    });
    const data = await response.json();
    !data.success && console.log(data.message);
    return data.success;
  } catch (err) {
    console.log(err);
    return false;
  }
}
