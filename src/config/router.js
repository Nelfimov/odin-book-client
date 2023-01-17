import {createBrowserRouter} from 'react-router-dom';
import {App, Home, Welcome, PostPage, NewPost} from '../pages';

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
      {
        path: 'new',
        element: <NewPost />,
      },
    ],
  },
]);

export default router;
