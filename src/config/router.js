import {createBrowserRouter} from 'react-router-dom';
import {Welcome} from '../components';

const router = createBrowserRouter([
  {
    path: '/welcome',
    element: <Welcome />,
  },
]);

export default router;
