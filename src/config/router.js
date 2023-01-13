import {createBrowserRouter} from 'react-router-dom';
import Welcome from '../components/Welcome';
import {App} from '../components';
import {Home} from '../components';

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
