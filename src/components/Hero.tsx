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
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getUser(id)
      .then((user) => {
        setUser(user);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id, file]);

  useEffect(() => {
    if (file) {
      uploadImage(id, file)
        .then((result) => {
          if (!result) return;
          if (!result.success) {
            return;
          }
          return getUser(id);
        })
        .then((user) => {
          if (!user) return;
          setUser(user);
        })
        .catch((err) => console.log(err));
    }
  }, [file]);

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

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target.files) return;
    if (!user) return;
    e.preventDefault();
    setFile(e.target.files[0]);
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
      <div className="prompt-to-update">
        <label htmlFor="image">
          <picture>
            <img
              src={user.image ?? '/images/avatar/default.webp'}
              alt="profile-image"
              onError={function (this: HTMLImageElement) {
                this.onerror = null;
                this.src = '/images/avatar/default.webp';
              }}
            />
          </picture>
          <span className="prompt">Click to upload new image</span>
        </label>
        <input
          accept="image/*"
          type="file"
          name="image"
          id="image"
          onChange={handleChange}
          onClick={(e) => {
            const element = e.target as HTMLInputElement;
            element.value = '';
          }}
          hidden
        />
      </div>
    );
  }

  function renderButton(user: IUser): JSX.Element {
    const id = localStorage.getItem('userID');
    if (!id) {
      return <div>You are not authorized</div>;
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
    return (
      <button className="disabled" disabled>
        {text}
      </button>
    );
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
