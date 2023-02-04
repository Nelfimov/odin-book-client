import { createBrowserRouter } from 'react-router-dom';
import {
  Home,
  PostPage,
  NewPost,
  ProfilePage,
  FriendsPage,
  ErrorPage,
} from '../pages';
import App from '../App';
import { getPosts, likePost, createComment } from '../api';
import { loadPost, loadComments } from '../loaders';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        loader: async () => {
          return await getPosts(true, 0);
        },
        element: <Home friends={true} />,
      },
      {
        path: 'posts',
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'new',
            element: <NewPost />,
          },
          {
            path: ':postID',
            element: <PostPage />,
            loader: async ({ params }) => {
              if (params.postID) {
                const post = await loadPost(params.postID);
                const comments = await loadComments(params.postID);
                return { post, comments };
              }
            },
          },
          {
            path: ':postID/new-comment',
            action: async ({ request, params }) => {
              const formData = await request.formData();
              request.body;
              return await createComment(
                params.postID as string,
                formData.get('comment-text') as string
              );
            },
          },
          {
            path: 'like',
            action: async ({ request }) => {
              const formData = await request.formData();
              return await likePost(formData.get('like') as string);
            },
          },
          {
            path: 'discover',
            loader: async () => {
              return await getPosts(false, 0);
            },
            element: <Home friends={false} />,
          },
        ],
      },
      {
        path: 'profile',
        errorElement: <ErrorPage />,
        children: [
          {
            path: ':userID',
            element: <ProfilePage />,
          },
          {
            path: 'friends',
            element: <FriendsPage />,
          },
        ],
      },
    ],
  },
]);
