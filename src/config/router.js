import {createBrowserRouter} from 'react-router-dom';
import {App, Home, Welcome, PostPage} from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'welcome',
        element: <Welcome />,
      },
      {
        path: 'posts/:postID',
        element: <PostPage />,
      },
    ],
  },
]);

export default router;
