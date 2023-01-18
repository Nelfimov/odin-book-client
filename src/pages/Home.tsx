import { useEffect, useState } from 'react'
import { Post } from '../components'
import { Post as PostInterface } from '../types'

interface HomeInterface {
  friends: boolean
}

/**
 * Home page.
 */
export function Home ({ friends }: HomeInterface): JSX.Element {
  const [posts, setPosts] = useState<PostInterface[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPosts(friends)
      .then((posts) => {
        setPosts(posts)
        setLoading(false)
      })
      .catch((err) => { console.log(err) })
  }, [])

  /**
   * Get posts.
   */
  async function getPosts (isCurrentUser: boolean): Promise<PostInterface[]> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: JSON.parse(localStorage.getItem('token') ?? '""')
    })
    let url = 'http://localhost:3000/posts'
    if (!isCurrentUser) url += '/friends'
    const response = await fetch(url, {
      headers
    })
    const data = await response.json()
    if (data.success === true) return data.posts
    return []
  }

  return (
    <div className="Home">
      { !loading && posts.map(
        (post) => <Post key={post._id} post={post} isLink={true}/>
      )}
    </div>
  )
}
