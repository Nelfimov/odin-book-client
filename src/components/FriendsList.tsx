import { Link } from 'react-router-dom';
import { Friend } from '../types/common';
import '../styles/FriendsList.css';

interface IFriendsList {
  friendsList: Friend[];
}

export function FriendsList({ friendsList }: IFriendsList): JSX.Element {
  return (
    <div className="FriendsList">
      {friendsList && friendsList.length > 0 && (
        <>
          <h3>Friends</h3>
          <ul>
            {friendsList.map((friend: Friend) => {
              return (
                <Link
                  className="friend-link"
                  key={friend._id}
                  to={`/profile/${friend.user._id}`}
                >
                  <li>{friend.user.username}</li>
                </Link>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
