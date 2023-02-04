import { User as IUser } from '../types/common';
import { FriendsList } from './FriendsList';
import '../styles/Hero.css';
import { useFetcher, useLoaderData } from 'react-router-dom';

interface Loader {
  user: IUser;
}

/**
 * Hero component.
 */
export function Hero(): JSX.Element {
  const { user } = useLoaderData() as Loader;
  const fetcher = useFetcher();

  function renderProfileImage(user: IUser): JSX.Element | undefined {
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
      <div className="prompt-to-update">
        <fetcher.Form
          method="patch"
          action={`/profile/${user._id}/upload-image`}
          onChange={(e) => fetcher.submit(e.currentTarget)}
          encType="multipart/form-data"
        >
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
            onClick={(e) => {
              const element = e.target as HTMLInputElement;
              element.value = '';
            }}
            hidden
          />
        </fetcher.Form>
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
      return (
        <fetcher.Form method="post" action={`/profile/${user._id}/request`}>
          <button>Send request</button>
        </fetcher.Form>
      );

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
      {!user && <h1>User not found</h1>}
      {user && (
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
