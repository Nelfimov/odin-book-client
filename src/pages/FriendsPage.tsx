import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../api';
import { Friend } from '../types/common/friend';
import '../styles/FriendsPage.css';

export function FriendsPage(): JSX.Element {
  const [friendsList, setFriendsList] = useState<Friend[]>();

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    if (userID == null) return;
    getUser(JSON.parse(userID)).then((user) => {
      setFriendsList(user?.friends);
    });
  });

  return (
    <div className="FriendsPage">
      <div className="pending">
        <h2>Incoming requests</h2>
        {friendsList?.map((friend) => {
          return (
            friend.status === 'pending' && (
              <div className="friend-container" key={friend._id}>
                <Link to={`/profile/${friend.user._id}`}>
                  <div className="name">{friend.user.username}</div>
                </Link>
                <button className="accept" type="button">
                  Accept
                </button>
              </div>
            )
          );
        })}
      </div>
      <hr />
      <div className="requested">
        <h2>Requested</h2>
        {friendsList?.map((friend) => {
          return (
            friend.status === 'requested' && (
              <Link to={`/profile/${friend.user._id}`}>
                <div className="friend-container" key={friend._id}>
                  <div className="name">{friend.user.username}</div>
                </div>
              </Link>
            )
          );
        })}
      </div>
      <hr />
      <div className="friends">
        <h2>Friends</h2>
        {friendsList?.map((friend) => {
          return (
            friend.status === 'requested' && (
              <Link to={`/profile/${friend.user._id}`}>
                <div className="friend-container" key={friend._id}>
                  <div className="name">{friend.user.username}</div>
                </div>
              </Link>
            )
          );
        })}
      </div>
    </div>
  );
}
