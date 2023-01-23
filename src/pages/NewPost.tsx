import { useNavigate } from 'react-router-dom';
import { FormEvent, useRef } from 'react';
import '../styles/NewPost.css';
import { createPost } from '../api';

/**
 * Post page.
 */
export function NewPost(): JSX.Element {
  const titleText = useRef<HTMLInputElement>(null);
  const postText = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const title = titleText.current?.value;
    const text = postText.current?.value;

    createPost(title, text)
      .then((result) => {
        if (result) navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="NewPost">
      <form onSubmit={handleSubmit}>
        <input
          ref={titleText}
          type="text"
          name="title"
          id="title"
          placeholder="Title"
        />
        <textarea
          ref={postText}
          name="column"
          id="column"
          rows={5}
          placeholder="Post text"
        />
        <button>Create new post</button>
      </form>
    </div>
  );
}
