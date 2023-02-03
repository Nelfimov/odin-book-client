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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
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
