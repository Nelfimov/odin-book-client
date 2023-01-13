import {createBrowserRouter} from 'react-router-dom';
import Welcome from '../components/Welcome';
import {isAuth} from '../utils/index';

const router = createBrowserRouter([
  {
    path: '/welcome',
    element: <Welcome />,
  },
  {
    path: '*',
    loader: () => {
      return isAuth();
    },
  },
]);

export default router;
