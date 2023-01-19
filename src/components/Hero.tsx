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
export function Hero ({ user, status, setFriendStatus }: HeroProps): JSX.Element {
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

  function renderButton (user: User): JSX.Element {
    const id = localStorage.getItem('userID')
    if (id == null) {
      return (
      <div>User not found</div>
      )
    }

    const userID = JSON.parse(id)
    if (userID === user._id) {
      return (
      <div>Its you</div>
      )
    }

    const friend = user.friends.find((el) => el.user._id === userID)
    if (friend == null) return <button onClick={handleClick}>Send request</button>

    let text = 'error'
    switch (friend.status) {
      case 'friends':
        text = 'Your friend'
        break
      case 'pending':
        text = 'Awaiting response'
        break
    }
    return <button disabled>{text}</button>
  }

  return (
      <div className="Hero">
        {
          user != null
            ? <>
          <img src="/images/avatar/default.webp" alt="avatar" />
          <span>{user.username}</span>
          <ul>
            {
              user.friends.map((friend: Friend) => {
                return <li key={friend.user._id}>{friend.user.username}: {friend.status}</li>
              })
            }
          </ul>
            {renderButton(user)}
            </>
            : <div>User not found</div>
        }
      </div>
  )
}
