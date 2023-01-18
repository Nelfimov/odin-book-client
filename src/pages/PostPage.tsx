import { useEffect, useState, useRef, FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { Post as PostComponent, Comment as CommentComponent } from '../components'
import { Comment, Data, Post } from '../types'
import '../styles/PostPage.css'

/**
 * Post page.
 */
export function PostPage (): JSX.Element {
  const { postID } = useParams()
  const [post, setPost] = useState<Post>()
  const [comments, setComments] = useState<Comment[] | undefined>([])
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [loadingComments, setLoadingComments] = useState(true)
  const commentText = useRef <HTMLTextAreaElement>(null)

  useEffect(() => {
    getPost()
      .then((post) => {
        setPost(post)
        setLoadingPosts(false)
      })
      .catch((err) => { console.log(err) })
    getComments()
      .then((comments) => {
        setComments(comments)
        setLoadingComments(false)
      })
      .catch((err: Error) => { console.log(err) })
  }, [])

  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: JSON.parse(localStorage.getItem('token') ?? '')
  })

  /**
   * Get comments to current post.
   */
  async function getComments (): Promise<Comment[] | undefined> {
    try {
      const response = await fetch(
          `http://localhost:3000/posts/${postID ?? ''}/comments`, {
            headers
          }
      )
      const data: Data = await response.json()
      if (data.success) return data.comments
      return []
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * Get single post.
   */
  async function getPost (): Promise<Post | undefined> {
    try {
      const response = await fetch(
          `http://localhost:3000/posts/${postID ?? ''}`, {
            headers
          }
      )
      const data: Data = await response.json()
      return data.post
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * Create comment.
   */
  function createComment (e: FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    const ref = commentText.current
    if (ref == null) return
    fetch(
          `http://localhost:3000/posts/${postID ?? ''}/comments`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              text: ref.value
            })
          }
    )
      .then(async (response) => await response.json())
      .then(async (data: Data) => {
        if (data.success) {
          setComments(await getComments())
          ref.value = ''
        }
      })
      .catch((err: Error) => { console.log(err) })
  }

  return (
    <div className="Post">
      {
        loadingPosts
          ? <p>Loading</p>
          : (post != null) && <PostComponent post={post} isLink={false} />
      }
      <div className="comments-container">
        <form onSubmit={createComment}>
          <textarea ref={commentText} name="column" id="column" rows={5}>

          </textarea>
          <button>Submit comment</button>
        </form>
        <div className="comments" id='comments'>
          {
            loadingComments
              ? <p>Loading</p>
              : comments !== undefined
                ? comments.map((comment: Comment) => {
                  return <CommentComponent key={comment._id} comment={comment} />
                })
                : null
          }
        </div>
      </div>
    </div>
  )
}
