import {useNavigate} from 'react-router-dom';
import {useRef} from 'react';
import '../styles/NewPost.css';

/**
 * Post page.
 * @return {JSX} JSX
 */
export default function NewPost() {
  const titleText = useRef();
  const postText = useRef();
  const navigate = useNavigate();

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': JSON.parse(localStorage.getItem('token')),
  });

  /**
   * Create post.
   * @param {shape} e Event
   */
  async function createPost(e) {
    try {
      e.preventDefault();

      const response = await fetch(
          `http://localhost:3000/posts`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              title: titleText.current.value,
              text: postText.current.value,
            }),
          },
      );
      const data = await response.json();
      if (data.success) {
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
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
        <textarea ref={postText} name="column" id="column" rows="5" />
        <button>Create new post</button>
      </form>
    </div>
  );
}
