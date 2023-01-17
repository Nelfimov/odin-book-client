import {createBrowserRouter} from 'react-router-dom';
import {App, Home, Welcome, PostPage, NewPost, Discover} from '../pages';

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
        path: 'posts/:postID',
        element: <PostPage />,
      },
      {
        path: 'new',
        element: <NewPost />,
      },
      {
        path: 'discover',
        element: <Discover />,
      },
    ],
  },
]);

export default router;
