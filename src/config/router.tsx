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
import {
  loadPost,
  loadComments,
  loadUser,
  loadUserPosts,
  loadUserComments,
} from '../loaders';

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
        children: [
          {
            path: ':userID',
            element: <ProfilePage />,
            loader: async ({ params }) => {
              if (params.userID) {
                const user = await loadUser(params.userID);
                const userPosts = await loadUserPosts(params.userID);
                const userComments = await loadUserComments(params.userID);
                return { user, userPosts, userComments };
              }
            },
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
