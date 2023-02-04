import { ActionFunctionArgs } from 'react-router-dom';
import { uploadImage } from '../api';

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
