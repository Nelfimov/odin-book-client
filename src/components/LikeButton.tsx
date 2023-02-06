import { Post } from '../types/common';
import { useFetcher } from 'react-router-dom';

interface Props {
  post: Post;
}

export function LikeButton({ post }: Props): JSX.Element {
  const username = localStorage.getItem('username');
  const fetcher = useFetcher();

  function isLiked(): boolean | undefined {
    if (username == null) return;

    const usersLiked = post.likes.users.map((user) => user.username);
    return usersLiked.includes(JSON.parse(username));
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
