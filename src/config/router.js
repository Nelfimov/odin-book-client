import {createBrowserRouter} from 'react-router-dom';
import Welcome from '../components/Welcome';
import App from '../components/App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'welcome',
        element: <Welcome />,
      },
    ],
  },
]);

export default router;
