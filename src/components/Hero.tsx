import { Friend, User } from '../types'

interface HeroProps {
  user: User | undefined
  status: string
  sendFriendRequest: () => void
}

/**
 * Hero component.
 */
export function Hero ({ user, status, sendFriendRequest }: HeroProps): JSX.Element | null {
  return (
      <div className="Hero">
        {
          user !== undefined
            ? <>
          <span>{user.username}</span>
          <ul>
            {
              user.friends.map((friend: Friend) => {
                return <li key={friend.user._id}>{friend.user.username}: {friend.status}</li>
              })
            }
          </ul>
          {
            user._id !== JSON.parse(localStorage.getItem('userID') ?? '') &&
            status === 'friends' &&
             <button disabled type='button'>
                Your friend
             </button>
          }
          {
            user._id !== JSON.parse(localStorage.getItem('userID') ?? '') &&
            status === 'pending' &&
            <button disabled type='button'>
              Awaiting response...
            </button>
          }
          {
            user._id !== JSON.parse(localStorage.getItem('userID') ?? '') &&
            status !== null &&
            <button type='button' onClick={sendFriendRequest}>
              Send friend request
            </button>
          }
          </>
            : <div>User not found</div>
        }
      </div>
  )
}
