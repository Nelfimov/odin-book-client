import { useLoaderData, useFetcher } from 'react-router-dom';
import {
  Post as PostComponent,
  Comment as CommentComponent,
} from '../components';
import { Comment, Post } from '../types/common';
import '../styles/PostPage.css';

interface Loader {
  post: Post;
  comments: Comment[];
}

/**
 * Post page.
 */
export function PostPage(): JSX.Element {
  const { post, comments } = useLoaderData() as Loader;
  const fetcher = useFetcher();

  return (
    <div className="Post">
      <PostComponent post={post} isLink={false} />
      {post && (
        <div className="comments-container">
          <fetcher.Form method="post" action="new-comment">
            <textarea name="comment-text" id="comment-text" rows={5}></textarea>
            <button>Submit comment</button>
          </fetcher.Form>
          <div className="comments" id="comments">
            {comments.map((comment: Comment) => {
              return <CommentComponent key={comment._id} comment={comment} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
