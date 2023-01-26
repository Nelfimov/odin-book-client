import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser, acceptFriendRequest } from '../api';
import { Friend } from '../types/common/friend';
import '../styles/FriendsPage.css';

export function FriendsPage(): JSX.Element {
  const [friendsList, setFriendsList] = useState<Friend[]>();

  const userID = localStorage.getItem('userID');

  useEffect(() => {
    if (userID == null) return;
    getUser(JSON.parse(userID)).then((user) => {
      setFriendsList(user?.friends);
    });
  }, []);

  function handleClick(id: string): void {
    if (userID == null) return;

    acceptFriendRequest(id)
      .then((result) => {
        console.log(result);
        if (result) {
          getUser(JSON.parse(userID))
            .then((user) => {
              console.log(user);
              setFriendsList(user?.friends);
            })
            .catch();
        }
      })
      .catch();
  }

  return (
    <div className="FriendsPage">
      <div className="pending">
        <h2>Incoming requests</h2>
        {friendsList?.map((friend) => {
          return (
            friend.status === 'pending' && (
              <div
                className="friend-container"
                key={`${friend._id}-${friend.status}`}
              >
                <Link to={`/profile/${friend.user._id}`}>
                  <div className="name">{friend.user.username}</div>
                </Link>
                <button
                  className="accept"
                  type="button"
                  onClick={() => {
                    handleClick(friend.user._id);
                  }}
                >
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
              <div className="friend-container" key={`${friend._id}`}>
                <Link to={`/profile/${friend.user._id}`}>
                  <div className="name">{friend.user.username}</div>
                </Link>
              </div>
            )
          );
        })}
      </div>
      <hr />
      <div className="friends">
        <h2>Friends</h2>
        {friendsList?.map((friend) => {
          return (
            friend.status === 'friends' && (
              <div
                className="friend-container"
                key={`${friend._id}-${friend.status}`}
              >
                <Link to={`/profile/${friend.user._id}`}>
                  <div className="name">{friend.user.username}</div>
                </Link>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
