import {createBrowserRouter} from 'react-router-dom';
import {
  App, Home, Welcome, PostPage, NewPost, Discover, Profile,
} from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home friends={true} />,
      },
      {
        path: 'welcome',
        element: <Welcome />,
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
          },
        ],
      },
      {
        path: 'discover',
        element: <Discover />,
      },
      {
        path: 'profile/:userID',
        element: <Profile />,
      },
    ],
  },
]);

export default router;
