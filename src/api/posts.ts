import { Data, Post } from '../types'

/**
 * Like current post.
 */
export function likePost (
  postID: string | undefined,
  liked: boolean,
  likedCallback: (arg: boolean) => void,
  post: Post,
  postCallback: (arg: Post) => void
): void {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: JSON.parse(localStorage.getItem('token') ?? '""')
  })
  fetch(
        `http://localhost:3000/posts/${postID ?? ''}/like`, {
          headers
        }
  )
    .then(async (response) => await response.json())
    .then((data: Data) => {
      if (!data.success) {
        console.log(data.message)
      }
    })
    .catch((err) => { console.log(err) })

  let newPost: Post
  if (liked) {
    newPost = {
      ...post,
      [post.likes.count]: --post.likes.count
    }
  } else {
    newPost = {
      ...post,
      [post.likes.count]: ++post.likes.count
    }
  }
  likedCallback(!liked)
  postCallback(newPost)
}

/**
 * Get posts.
  */
export async function getPosts (isCurrentUser: boolean): Promise<Post[] | undefined> {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: JSON.parse(localStorage.getItem('token') ?? '""')
  })
  let url = 'http://localhost:3000/posts'
  if (!isCurrentUser) url += '/friends'
  const response = await fetch(
    url, {
      headers
    })
  const data: Data = await response.json()
  return data.posts
}

/**
 * Create new post.
 */
export async function createPost (
  title: string | undefined, text: string | undefined
): Promise<boolean> {
  try {
    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: JSON.parse(localStorage.getItem('token') ?? '""')
    })

    if (title == null || text == null) return false

    const response = await fetch(
      'http://localhost:3000/posts', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title,
          text
        })
      }
    )
    const data: Data = await response.json()
    return data.success
  } catch (err) {
    console.log(err)
    return false
  }
}
