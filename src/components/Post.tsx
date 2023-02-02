import { MouseEvent, useState } from 'react';
import { Post as PostInterface } from '../types/common';
import { Link } from 'react-router-dom';
import '../styles/Post.css';
import { likePost } from '../api';

interface PostProps {
  post: PostInterface;
  isLink: boolean;
}

export function Post({ post: postProp, isLink }: PostProps): JSX.Element {
  const [post, setPost] = useState(postProp);
  const [liked, setLiked] = useState(false);

  function handleButton(e: MouseEvent<HTMLButtonElement>): void {
    e.stopPropagation();
    const element = e.currentTarget as HTMLButtonElement;
    if (!element.dataset.post) return;
    likePost(element.dataset.post, liked, setLiked, post, setPost);
    element.classList.toggle('liked');
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
        <button data-post={post._id} type="button" onClick={handleButton}>
          <img src="/images/icons/like.svg" alt="like" />
          {post.likes.count}
        </button>

        {isLink && (
          <Link to={`/posts/${post._id}#comments`}>
            <img src="/images/icons/comment.svg" alt="comments" />
          </Link>
        )}
      </div>
    </div>
  );
}
