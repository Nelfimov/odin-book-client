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
