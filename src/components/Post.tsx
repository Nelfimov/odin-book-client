import { MouseEvent, useState } from 'react'
import { Post as PostInterface, Data } from '../types'
import { Link } from 'react-router-dom'
import '../styles/Post.css'

interface PostProps {
  post: PostInterface
  isLink: boolean
}

/**
 * Post component.
 */
export function Post ({ post: postProp, isLink }: PostProps): JSX.Element {
  const [post, setPost] = useState(postProp)
  const [liked, setLiked] = useState(false)

  /**
   * Like current post.
   */
  function likePost (e: MouseEvent<HTMLElement>): void {
    e.stopPropagation()
    const postID: string | undefined = e.currentTarget.dataset.post
    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: getToken()
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

    let newPost
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
    setLiked(!liked)
    setPost(newPost)
    const target = e.target as Element
    target.classList.toggle('liked')
  }

  function getToken (): string {
    const token = localStorage.getItem('token')
    if (token === null) return ''
    return JSON.parse(token)
  }

  return (
    <div className="post-container">

      <div className="top">
        <Link to={`/profile/${post.author._id}`}>
          <span>{post.author.username}</span>
        </Link>
        <span>
          {`${new Date(post.createdAt).toLocaleTimeString()} 
                ${new Date(post.createdAt).toDateString()}`}
        </span>
      </div>
      {
            isLink
              ? <Link to={`/posts/${post._id}`}>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
          </Link>
              : <>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
          </>
      }
      <div className="bottom">

        <button data-post={post._id} type='button' onClick={likePost}>
          <img src="/images/icons/like.svg" alt="like" />
          {post.likes.count}
        </button>

        {
          isLink && <Link to={`/posts/${post._id}#comments`} >
            <img src="/images/icons/comment.svg" alt="comments" />
          </ Link>
        }

      </div>

    </div>
  )
}
