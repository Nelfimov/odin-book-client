import propTypes from 'prop-types';

/**
 * Hero component.
 * @return {JSX} JSX
 */
export default function Hero({user, friendStatus, sendFriendRequest}) {
  return (
    <div className="Hero">
      <span>{user.username}</span>
      <ul>
        {
          user.friends.map((friend) => {
            <li>{friend.user.username}: {friend.status}</li>;
          })
        }
      </ul>
      {
        user._id !== JSON.parse(localStorage.getItem('userID')) &&
        friendStatus === 'friends' &&
         <button disabled type='button'>
            Your friend
         </button>
      }
      {
        user._id !== JSON.parse(localStorage.getItem('userID')) &&
        friendStatus === 'pending' &&
        <button disabled type='button'>
          Awaiting response...
        </button>
      }
      {
        user._id !== JSON.parse(localStorage.getItem('userID')) &&
        friendStatus !== null &&
        <button type='button' onClick={sendFriendRequest}>
          Send friend request
        </button>
      }
    </div>
  );
}

Hero.propTypes = {
  user: propTypes.object.isRequired,
  friendStatus: propTypes.string,
  sendFriendRequest: propTypes.func,
};
