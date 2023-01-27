import { Dispatch, SetStateAction } from 'react';
import { User } from '../types/common';
import { FriendsList } from './FriendsList';
import { sendFriendRequest } from '../api';
import '../styles/Hero.css';

interface HeroProps {
  user: User | undefined;
  status: string;
  setFriendStatus: Dispatch<SetStateAction<string>>;
}

/**
 * Hero component.
 */
export function Hero({
  user,
  status,
  setFriendStatus,
}: HeroProps): JSX.Element {
  function handleClick(): void {
    if (user == null) return;
    sendFriendRequest(user._id)
      .then((result) => {
        if (result) {
          setFriendStatus('pending');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function renderButton(user: User): JSX.Element {
    const id = localStorage.getItem('userID');
    if (id == null) {
      return <div>User not found</div>;
    }

    const userID = JSON.parse(id);
    if (userID === user._id) {
      return <span className="you">It is you</span>;
    }

    const friend = user.friends.find((el) => el.user._id === userID);
    if (friend == null)
      return <button onClick={handleClick}>Send request</button>;

    let text = 'error';
    switch (status) {
      case 'friends':
        text = 'Your friend';
        break;
      case 'pending':
        text = 'Awaiting response';
        break;
    }
    return <button disabled>{text}</button>;
  }

  return (
    <div className="Hero">
      {user == null ? (
        <h1>User not found</h1>
      ) : (
        <div className="content">
          <div className="left">
            <img src="/images/avatar/default.webp" alt="avatar" />
            {renderButton(user)}
          </div>

          <div className="middle">
            <span className="user">{user.username}</span>
          </div>

          <div className="right">
            <FriendsList
              friendsList={user.friends.filter(
                (friend) => friend.status === 'friends'
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}
