import { Data, Comment } from '../types'

/**
 * Get comments to post.
 */
export async function getComments (
  postID: string | undefined
): Promise<Comment[] | undefined> {
  try {
    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: JSON.parse(localStorage.getItem('token') ?? '')
    })
    const response = await fetch(
          `http://localhost:3000/posts/${postID ?? '""'}/comments`, {
            headers
          }
    )
    const data: Data = await response.json()
    return data.comments
  } catch (err) {
    console.log(err)
  }
}

/**
 * Create new comment to current post
 */
export async function createComment (
  postID: string | undefined,
  text: string | undefined
): Promise<boolean> {
  if (text == null || postID == null) return false

  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: JSON.parse(localStorage.getItem('token') ?? '""')
  })
  const response = await fetch(
          `http://localhost:3000/posts/${postID ?? ''}/comments`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              text
            })
          }
  )
  const data: Data = await response.json()
  return data.success
}

/**
 * Get comments to post.
 */
export async function getUserComments (
  userID: string | undefined
): Promise<Comment[] | undefined> {
  try {
    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: JSON.parse(localStorage.getItem('token') ?? '""')
    })
    const response = await fetch(
          `http://localhost:3000/profile/${userID ?? '""'}/comments`, {
            headers
          }
    )
    const data: Data = await response.json()
    return data.comments
  } catch (err) {
    console.log(err)
  }
}
