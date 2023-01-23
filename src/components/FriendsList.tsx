import { Link } from 'react-router-dom';
import { Friend } from '../types/friend';

interface IFriendsList {
  friendsList: Friend[];
}

export function FriendsList({ friendsList }: IFriendsList): JSX.Element {
  return (
    <div className="FriendsList">
      <h3>Friends</h3>
      <ul>
        {friendsList.map((friend: Friend) => {
          return (
            friend.status === 'requested' && (
              <Link className="friend-link" to={`/profile/${friend.user._id}`}>
                <li key={friend._id}>{friend.user.username}</li>
              </Link>
            )
          );
        })}
      </ul>
    </div>
  );
}
