import { Post } from '../types/common';
import { useFetcher } from 'react-router-dom';

interface Props {
  post: Post;
}

export function LikeButton({ post }: Props): JSX.Element {
  const userID = localStorage.getItem('userID');
  const fetcher = useFetcher();

  function isLiked(): boolean | undefined {
    if (userID == null) return;

    const usersLiked = post.likes.users.map((user) => user._id);
    return usersLiked.includes(userID);
  }

  return (
    <fetcher.Form method="post" action={`/posts/like`}>
      <button name="like" value={post._id}>
        <img
          src="/images/icons/like.svg"
          alt="like"
          className={isLiked() ? 'liked' : ''}
        />
        {post.likes.count}
      </button>
    </fetcher.Form>
  );
}
