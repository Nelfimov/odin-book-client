import { ActionFunctionArgs } from 'react-router-dom';
import { createComment } from '../api/comments';

export async function actionCreateComment({
  params,
  request,
}: ActionFunctionArgs) {
  const formData = await request.formData();
  request.body;
  return await createComment(
    params.postID as string,
    formData.get('comment-text') as string
  );
}
