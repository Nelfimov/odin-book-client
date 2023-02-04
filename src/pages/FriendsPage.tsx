import { Link, useFetcher, useLoaderData } from 'react-router-dom';
import { Friend } from '../types/common/friend';
import '../styles/FriendsPage.css';

export function FriendsPage(): JSX.Element {
  const friendsList = useLoaderData() as Friend[];
  const fetcher = useFetcher();

  return (
    <div className="FriendsPage">
      <div className="pending">
        <h2>Incoming requests</h2>
        {friendsList.map((friend) => {
          return (
            friend.status === 'pending' && (
              <div
                className="friend-container"
                key={`${friend._id}-${friend.status}`}
              >
                <Link to={`/profile/${friend.user._id}`}>
                  <div className="name">{friend.user.username}</div>
                </Link>
                <div className="buttons">
                  <fetcher.Form
                    method="post"
                    action={`/profile/${friend.user._id}/accept`}
                  >
                    <button className="accept">Accept</button>
                  </fetcher.Form>
                  <fetcher.Form
                    method="post"
                    action={`/profile/${friend.user._id}/accept`}
                  >
                    <button className="reject">Reject</button>
                  </fetcher.Form>
                </div>
              </div>
            )
          );
        })}
      </div>
      <hr />
      <div className="requested">
        <h2>Requested</h2>
        {friendsList.map((friend) => {
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
        {friendsList.map((friend) => {
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
