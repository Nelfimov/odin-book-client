import { MouseEvent, Dispatch, SetStateAction } from 'react'
import { Friend, User } from '../types'
import { sendFriendRequest } from '../api'

interface HeroProps {
  user: User | undefined
  status: string
  setFriendStatus: Dispatch<SetStateAction<string>>
}

/**
 * Hero component.
 */
export function Hero ({ user, status, setFriendStatus }: HeroProps): JSX.Element | null {
  function handleClick (e: MouseEvent<HTMLButtonElement>): void {
    if (user == null) return
    sendFriendRequest(user._id)
      .then((result) => {
        if (result) {
          setFriendStatus('pending')
        }
      })
      .catch((err) => { console.log(err) })
  }

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
            <button type='button' onClick={handleClick}>
              Send friend request
            </button>
          }
          </>
            : <div>User not found</div>
        }
      </div>
  )
}
