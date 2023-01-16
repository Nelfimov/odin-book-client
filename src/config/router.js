import {createBrowserRouter} from 'react-router-dom';
import {App, Home, Welcome, Post} from '../pages';

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
        element: <Post />,
      },
    ],
  },
]);

export default router;
