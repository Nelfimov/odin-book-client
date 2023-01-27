import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Post, Hero, Comment } from '../components';
import {
  Post as PostInterface,
  User,
  Friend,
  Comment as CommentInterface,
} from '../types/common';
import { getUserPosts, getUser, getUserComments } from '../api';
import '../styles/ProfilePage.css';

/**
 * Profile page.
 */
export function ProfilePage(): JSX.Element {
  const [posts, setPosts] = useState<PostInterface[]>();
  const [loadingPosts, setLoadingPosts] = useState<boolean>(true);
  const [user, setUser] = useState<User>();
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [comments, setComments] = useState<CommentInterface[]>();
  const [loadingComments, setLoadingComments] = useState<boolean>(true);

  const [friendStatus, setFriendStatus] = useState<string>('');
  const { userID } = useParams();

  useEffect(() => {
    if (userID) {
      getUserPosts(userID)
        .then((posts) => {
          setPosts(posts);
          setLoadingPosts(false);
        })
        .catch((err) => {
          console.log(err);
        });
      getUser(userID)
        .then((user) => {
          if (user != null) {
            setUser(user);
            setLoadingUser(false);
            setFriendStatus(checkUserFriendStatus(user));
          }
        })
        .catch((err) => {
          console.log(err);
        });
      getUserComments(userID)
        .then((comments) => {
          if (comments != null) {
            setComments(comments);
            setLoadingComments(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userID]);

  useEffect(() => {
    if (userID) {
      getUser(userID)
        .then((user) => {
          if (user != null) {
            setUser(user);
            setLoadingUser(false);
            setFriendStatus(checkUserFriendStatus(user));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [friendStatus]);

  /**
   * Check friend status of user.
   */
  function checkUserFriendStatus(user: User): string {
    const { friends } = user;
    const currentUser = JSON.parse(localStorage.getItem('userID') ?? '');
    const friend = friends.find(
      (friend: Friend) => friend.user._id === currentUser
    );

    if (friend === undefined) return 'undefined';

    if (friend.status === 'pending' || friend.status === 'rejected')
      return 'pending';

    if (friend.status === 'friends') return 'friends';
    return 'available';
  }

  return (
    <div className="Profile">
      <div className="user-info">
        {!loadingUser && (
          <Hero
            user={user}
            status={friendStatus}
            setFriendStatus={setFriendStatus}
          />
        )}
      </div>
      <h2>Recent posts</h2>
      {!loadingPosts &&
        posts != null &&
        posts.map((post: PostInterface) => (
          <Post key={post._id} post={post} isLink={true} />
        ))}
      <h2>Recent comments</h2>
      <div className="comments-container">
        <div className="comments">
          {!loadingComments &&
            comments != null &&
            comments.map((comment: CommentInterface) => {
              return (
                // eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
                <Link key={comment._id} to={`/posts/${comment.post}`}>
                  <Comment comment={comment} />
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
