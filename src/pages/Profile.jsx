import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Post, Hero} from '../components';

/**
 * Profile page.
 * @return {JSX} JSX
 */
export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [user, setUser] = useState();
  const [loadingUser, setLoadingUser] = useState(true);
  const [friendStatus, setFriendStatus] = useState();
  const {userID} = useParams();

  useEffect(() => {
    getPosts(userID)
        .then((posts) => {
          setPosts(posts);
          setLoadingPosts(false);
        })
        .catch((err) => console.log(err));
    getUser(userID)
        .then((user) => {
          setUser(user);
          setLoadingUser(false);
          setFriendStatus(checkUserFriendStatus(user));
        });
  }, []);

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': JSON.parse(localStorage.getItem('token')),
  });

  /**
   * Get posts.
   * @param {string} id ID of user.
   */
  async function getPosts(id) {
    const response = await fetch(`http://localhost:3000/profile/${userID}/posts`, {
      headers,
    });
    const data = await response.json();
    if (data.success) return data.posts;
    return [];
  }

  /**
   * Get user info.
   * @param {string} id ID of user.
   */
  async function getUser(id) {
    const response = await fetch(`http://localhost:3000/profile/${userID}`, {
      headers,
    });
    const data = await response.json();
    if (data.success) return data.user;
    console.log(data.message);
  }

  /**
   * Check friend status of user.
   * @param {shape} user User object.
   * @return {string}
   */
  function checkUserFriendStatus(user) {
    const {friends} = user;
    const currentUser = JSON.parse(localStorage.getItem('userID'));
    const friend = friends.find((friend) => friend.user._id === currentUser);
    if (!friend) return null;

    if (friend.status === 'pending' ||
    friend.status === 'rejected') return 'pending';

    if (friend.status === 'friends') return 'friends';
  }

  /**
   * Send friend request.
   * @return {bool}
   */
  async function sendFriendRequest() {
    const response = await fetch(`http://localhost:3000/profile/${userID}/request`, {
      headers,
    });
    const data = await response.json();
    console.log(data);
    data.success && setFriendStatus('pending');
  }

  return (
    <div className="Profile">
      <div className="user-info">
        {
          !loadingUser &&
            <Hero
              user={user}
              status={friendStatus}
              sendFriendRequest={sendFriendRequest}
            />
        }
      </div>
      <h2>Recent posts</h2>
      {
        !loadingPosts && posts.map(
            (post) => <Post key={post._id} post={post} isLink={true}/>,
        )
      }
    </div>
  );
}
