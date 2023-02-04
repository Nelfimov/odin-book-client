import { ActionFunctionArgs } from 'react-router-dom';
import {
  acceptFriendRequest,
  rejectFriendRequest,
  sendFriendRequest,
  uploadImage,
} from '../api';

export async function actionUploadImage({
  request,
  params,
}: ActionFunctionArgs) {
  if (params.userID) {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;
    if (file) {
      await uploadImage(params.userID, file);
    }
  }
}

export async function actionRequestFriendship({ params }: ActionFunctionArgs) {
  const userToken = localStorage.getItem('token');
  if (!userToken) return;
  const friendID = params.userID;
  if (!friendID) return;

  return await sendFriendRequest(friendID);
}

export async function actionAcceptFriendship({ params }: ActionFunctionArgs) {
  const userToken = localStorage.getItem('token');
  if (!userToken) return;
  const friendID = params.userID;
  if (!friendID) return;

  return await acceptFriendRequest(friendID);
}

export async function actionRejectFriendship({ params }: ActionFunctionArgs) {
  const userToken = localStorage.getItem('token');
  if (!userToken) return;
  const friendID = params.userID;
  if (!friendID) return;

  return await rejectFriendRequest(friendID);
}
