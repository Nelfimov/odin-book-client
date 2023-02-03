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
import { getPosts } from '../api/posts';

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
