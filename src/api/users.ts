import { User, Data } from '../types/common';
import imageCompression from 'browser-image-compression';
// import Compressor from 'compressorjs';

export async function getUser(id: string): Promise<User | undefined> {
  try {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: JSON.parse(token),
    });
    const response = await fetch(`/profile/${id}`, {
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
    const response = await fetch(`/profile/${id}/request`, {
      headers,
    });
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
    const response = await fetch(`/profile/${id}/accept`, {
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
    const response = await fetch(`/profile/${id}/reject`, {
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

export async function uploadImage(
  id: string,
  file: File
): Promise<Data | undefined> {
  const token = localStorage.getItem('token');
  if (!token) return;

  const compressedImage = await imageCompression(file, {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  });
  const form = new FormData();
  form.append(
    'image',
    compressedImage,
    `${new Date().toISOString()}-${id}.${file.type.split('/')[1]}`
  );

  const headers = new Headers({
    Authorization: JSON.parse(token),
  });
  const response = await fetch(`/profile/${id}/upload`, {
    method: 'PATCH',
    headers,
    body: form,
  });
  const data: Data = await response.json();
  return data;
}
