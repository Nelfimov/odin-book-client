import { Post } from '../types/common';
import { MouseEvent } from 'react';
import { likePost } from '../api';

interface Props {
  post: Post;
}

export function LikeButton({ post }: Props): JSX.Element {
  const userID = localStorage.getItem('userID');

  function isLiked(): boolean | undefined {
    if (userID == null) return;

    const usersLiked = post.likes.users.map((user) => user._id);
    return usersLiked.includes(userID);
  }

  function handleButton(e: MouseEvent<HTMLButtonElement>): void {
    e.stopPropagation();
    const element = e.currentTarget as HTMLButtonElement;
    likePost(post._id)
      .then((result) => {
        if (result === true) {
          element.classList.add('liked');
        }
        if (result === false) {
          element.classList.remove('liked');
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <button name="like" type="button" onClick={handleButton}>
      <img
        src="/images/icons/like.svg"
        alt="like"
        className={isLiked() ? 'liked' : ''}
      />
      {post.likes.count}
    </button>
  );
}
