import {createBrowserRouter} from 'react-router-dom';
import {Welcome} from '../components/Welcome';

const router = createBrowserRouter([
  {
    path: '/welcome',
    element: <Welcome />,
  },
]);

export {router};
