import '../styles/Comment.css';
import { Comment as CommentInterface } from '../types/common';

interface CommentProps {
  comment: CommentInterface;
}

/**
 * Comment component.
 */
export function Comment({ comment }: CommentProps): JSX.Element {
  return (
    <div className="comment-container">
      <div className="top">
        <span className="username">{comment.author.username}</span>
        <span>{new Date(comment.createdAt).toDateString()}</span>
      </div>

      <p>{comment.text}</p>

      <div className="bottom"></div>
    </div>
  );
}
