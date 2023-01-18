import { createBrowserRouter } from 'react-router-dom'
import {
  Home, PostPage, NewPost, Discover, Profile
} from '../pages'
import App from '../App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home friends={true} />
      },
      {
        path: 'posts',
        children: [
          {
            path: 'new',
            element: <NewPost />
          },
          {
            path: ':postID',
            element: <PostPage />
          },
          {
            path: 'discover',
            element: <Discover />
          }
        ]
      },
      {
        path: 'profile/:userID',
        element: <Profile />
      }
    ]
  }
])
