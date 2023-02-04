import { createBrowserRouter } from 'react-router-dom';
import {
  Home,
  PostPage,
  NewPost,
  ProfilePage,
  FriendsPage,
  ErrorPage,
} from '../pages';
import App from '../App';
import { getPosts } from '../api';
import {
  loadPost,
  loadComments,
  loadUser,
  loadUserPosts,
  loadUserComments,
  loadUserFriends,
} from '../loaders';
import {
  actionUploadImage,
  actionLike,
  actionCreateComment,
  actionRequestFriendship,
  actionAcceptFriendship,
  actionRejectFriendship,
} from '../actions';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        loader: async () => getPosts(true, 0),
        element: <Home friends={true} />,
      },
      {
        path: 'posts',
        children: [
          {
            path: 'new',
            element: <NewPost />,
          },
          {
            path: ':postID',
            element: <PostPage />,
            loader: async ({ params }) => {
              const postID = params.postID;
              if (postID) {
                const post = await loadPost(postID);
                const comments = await loadComments(postID);
                return { post, comments };
              }
            },
          },
          {
            path: ':postID/new-comment',
            action: actionCreateComment,
          },
          {
            path: 'like',
            action: actionLike,
          },
          {
            path: 'discover',
            loader: async () => await getPosts(false, 0),
            element: <Home friends={false} />,
          },
        ],
      },
      {
        path: 'profile',
        children: [
          {
            path: ':userID',
            element: <ProfilePage />,
            loader: async ({ params }) => {
              if (params.userID) {
                const user = await loadUser(params.userID);
                const userPosts = await loadUserPosts(params.userID);
                const userComments = await loadUserComments(params.userID);
                return { user, userPosts, userComments };
              }
            },
          },
          {
            path: ':userID/upload-image',
            action: actionUploadImage,
          },
          {
            path: ':userID/request',
            action: actionRequestFriendship,
          },
          {
            path: ':userID/accept',
            action: actionAcceptFriendship,
          },
          {
            path: ':userID/decline',
            action: actionRejectFriendship,
          },
          {
            path: 'friends',
            element: <FriendsPage />,
            loader: loadUserFriends,
          },
        ],
      },
    ],
  },
]);
