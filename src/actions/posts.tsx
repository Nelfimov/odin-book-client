import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { createPost, likePost } from '../api/posts';

export async function actionLike({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  return await likePost(formData.get('like') as string);
}

export async function actionCreatePost({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const text = formData.get('text');
  const title = formData.get('title');

  if (text && title) {
    const result = await createPost(title as string, text as string);
    return result && redirect('/');
  }
}
