import {createBrowserRouter} from 'react-router-dom';
import {App, Home, Welcome} from '../pages';

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
    ],
  },
]);

export default router;
