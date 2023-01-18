import { useNavigate } from 'react-router-dom'
import { FormEvent, useRef } from 'react'
import { Data } from '../types'
import '../styles/NewPost.css'

/**
 * Post page.
 */
export function NewPost (): JSX.Element {
  const titleText = useRef<HTMLInputElement>(null)
  const postText = useRef<HTMLTextAreaElement>(null)
  const navigate = useNavigate()

  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: JSON.parse(localStorage.getItem('token') ?? '')
  })

  /**
   * Create post.
   */
  function createPost (e: FormEvent<HTMLFormElement>): void {
    e.preventDefault()

    const titleInput = titleText.current
    const textInput = postText.current

    if (titleInput == null || textInput == null) return

    fetch(
      'http://localhost:3000/posts', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: titleInput.value,
          text: textInput.value
        })
      }
    )
      .then(async (response) => await response.json())
      .then((data: Data) => {
        if (data.success) {
          navigate('/')
        }
      }).catch((err) => { console.log(err) })
  }

  return (
    <div className="NewPost">
      <form onSubmit={createPost}>
        <input
          ref={titleText}
          type="text"
          name="title"
          id="title"
          placeholder='Title'
        />
        <textarea
          ref={postText}
          name="column"
          id="column"
          rows={5}
          placeholder='Post text'
        />
        <button>Create new post</button>
      </form>
    </div>
  )
}
