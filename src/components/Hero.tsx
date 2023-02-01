import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { User } from '../types/common';
import { FriendsList } from './FriendsList';
import { sendFriendRequest, uploadImage, getUser } from '../api';
import '../styles/Hero.css';

interface HeroProps {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  status: string;
  setFriendStatus: Dispatch<SetStateAction<string>>;
}

/**
 * Hero component.
 */
export function Hero({
  user,
  setUser,
  status,
  setFriendStatus,
}: HeroProps): JSX.Element {
  function handleClick(): void {
    if (!user) return;
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

  function handleUpload(e: ChangeEvent<HTMLInputElement>): void {
    if (!user) return;
    if (!e.target.files) return;
    const file = e.target.files[0];
    uploadImage(user._id, file)
      .then((result) => {
        if (!result) return;
        getUser(user._id).then((user) => setUser(user));
      })
      .catch((err) => console.log(err));
  }

  function renderProfileImage(user: User): JSX.Element | undefined {
    const userID = localStorage.getItem('userID');
    if (!userID) return;

    if (user._id !== JSON.parse(userID))
      return (
        <img
          src={user.image ?? '/images/avatar/default.webp'}
          alt="profile-image"
        />
      );

    return (
      <>
        <label htmlFor="image">
          <img
            src={user.image ?? '/images/avatar/default.webp'}
            alt="profile-image"
          />
        </label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleUpload}
          hidden
        />
      </>
    );
  }

  function renderButton(user: User): JSX.Element {
    const id = localStorage.getItem('userID');
    if (!id) {
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
            {renderProfileImage(user)}
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
