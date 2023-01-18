import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Post, Hero } from '../components'
import { Data, Friend, Post as PostInterface, User } from '../types'

/**
 * Profile page.
 */
export function Profile (): JSX.Element {
  const [posts, setPosts] = useState<PostInterface[]>()
  const [loadingPosts, setLoadingPosts] = useState<boolean>(true)
  const [user, setUser] = useState<User>()
  const [loadingUser, setLoadingUser] = useState<boolean>(true)
  const [friendStatus, setFriendStatus] = useState<string>('')
  const { userID } = useParams()

  useEffect(() => {
    getPosts(userID)
      .then((posts) => {
        setPosts(posts)
        setLoadingPosts(false)
      })
      .catch((err) => { console.log(err) })
    getUser(userID)
      .then((user) => {
        setUser(user)
        setLoadingUser(false);
        (user != null) && setFriendStatus(checkUserFriendStatus(user))
      })
      .catch((err) => { console.log(err) })
  }, [])

  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: JSON.parse(localStorage.getItem('token') ?? '')
  })

  /**
   * Get posts.
   */
  async function getPosts (id: string | undefined): Promise<PostInterface[] | undefined> {
    const response = await fetch(`http://localhost:3000/profile/${userID ?? ''}/posts`, {
      headers
    })
    const data: Data = await response.json()
    if (data.success) return data.posts
    return []
  }

  /**
   * Get user info.
   */
  async function getUser (id: string | undefined): Promise<User | undefined> {
    const response = await fetch(`http://localhost:3000/profile/${userID ?? ''}`, {
      headers
    })
    const data: Data = await response.json()
    if (data.success) return data.user
    console.log(data.message)
  }

  /**
   * Check friend status of user.
   */
  function checkUserFriendStatus (user: User): string {
    const { friends } = user
    const currentUser = JSON.parse(localStorage.getItem('userID') ?? '')
    const friend = friends.find((friend: Friend) => friend.user._id === currentUser)

    if (friend === undefined) return 'undefined'

    if (friend.status === 'pending' ||
    friend.status === 'rejected') return 'pending'

    if (friend.status === 'friends') return 'friends'
    return 'available'
  }

  /**
   * Send friend request.
   */
  function sendFriendRequest (): void {
    fetch(`http://localhost:3000/profile/${userID ?? ''}/request`, {
      headers
    })
      .then(async (response) => await response.json())
      .then((data: Data) => {
        data.success && setFriendStatus('pending')
      })
      .catch((err) => { console.log(err) })
  }

  return (
    <div className="Profile">
      <div className="user-info">
        {
          !loadingUser &&
            <Hero
              user={user}
              status={friendStatus}
              sendFriendRequest={sendFriendRequest}
            />
        }
      </div>
      <h2>Recent posts</h2>
      {
        !loadingPosts && (posts != null) && posts.map(
          (post: PostInterface) => <Post key={post._id} post={post} isLink={true}/>
        )
      }
    </div>
  )
}
