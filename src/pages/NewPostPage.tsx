import { useFetcher } from 'react-router-dom';
import '../styles/NewPost.css';

/**
 * Post page.
 */
export function NewPost(): JSX.Element {
  const fetcher = useFetcher();

  return (
    <div className="NewPost">
      <fetcher.Form method="post">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          required
        />
        <textarea
          name="text"
          id="text"
          rows={5}
          placeholder="Post text"
          required
        />
        <button>Create new post</button>
      </fetcher.Form>
    </div>
  );
}
