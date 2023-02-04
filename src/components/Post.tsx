import { Post as PostInterface } from '../types/common';
import { Link } from 'react-router-dom';
import { LikeButton } from './LikeButton';
import '../styles/Post.css';

export interface Props {
  post: PostInterface;
  isLink: boolean;
  key?: string;
  ref?: any;
}

export function Post({ post, isLink }: Props): JSX.Element {
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

      {isLink ? (
        <Link to={`/posts/${post._id}`}>
          <h2>{post.title}</h2>
          <p>{post.textPreview}</p>
        </Link>
      ) : (
        <>
          <h2>{post.title}</h2>
          <p>{post.text}</p>
        </>
      )}
      <div className="bottom">
        <LikeButton post={post} />

        {isLink && (
          <Link to={`/posts/${post._id}#comments`}>
            <img src="/images/icons/comment.svg" alt="comments" />
          </Link>
        )}
      </div>
    </div>
  );
}
