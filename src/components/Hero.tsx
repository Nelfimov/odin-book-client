import { ChangeEvent, useEffect, useState } from 'react';
import { User as IUser } from '../types/common';
import { FriendsList } from './FriendsList';
import { sendFriendRequest, uploadImage, getUser } from '../api';
import '../styles/Hero.css';

interface Props {
  id: string;
}

/**
 * Hero component.
 */
export function Hero({ id }: Props): JSX.Element {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getUser(id)
      .then((user) => {
        setUser(user);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function handleClick(): void {
    if (!user) return;
    sendFriendRequest(id)
      .then((result) => {
        if (result) {
          setLoading(true);
          getUser(id)
            .then((user) => {
              setUser(user);
              setLoading(false);
            })
            .catch((err) => console.log(err));
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
    uploadImage(id, file)
      .then((result) => {
        if (!result) return;
        getUser(id).then((user) => setUser(user));
        const input = document.getElementById('image') as HTMLInputElement;
        if (input) input.value = '';
      })
      .catch((err) => console.log(err));
  }

  function renderProfileImage(user: IUser): JSX.Element | undefined {
    const userID = localStorage.getItem('userID');
    if (!userID) return;

    if (id !== JSON.parse(userID))
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
          onClick={function (this: HTMLInputElement) {
            this.value = '';
          }}
          hidden
        />
      </>
    );
  }

  function renderButton(user: IUser): JSX.Element {
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
    switch (friend.status) {
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
      {loading && <h1>Loading</h1>}
      {!loading && !user && <h1>User not found</h1>}
      {!loading && user && (
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
