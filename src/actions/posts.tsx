import { ActionFunctionArgs } from 'react-router-dom';
import { likePost } from '../api/posts';

export async function actionLike({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  return await likePost(formData.get('like') as string);
}
