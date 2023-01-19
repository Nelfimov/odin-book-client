import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Post, Hero } from '../components'
import { Friend, Post as PostInterface, User } from '../types'
import { getUserPosts, getUser } from '../api'

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
    getUserPosts(userID)
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
  }, [friendStatus, user])

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

  return (
    <div className="Profile">
      <div className="user-info">
        {
          !loadingUser &&
            <Hero
              user={user}
              status={friendStatus}
              setFriendStatus={setFriendStatus}
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
