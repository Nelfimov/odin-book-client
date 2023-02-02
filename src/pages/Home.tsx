import { useEffect, useState } from 'react';
import { Post } from '../components';
import { getPosts } from '../api';
import { Post as IPost } from '../types/common';

interface HomeInterface {
  friends: boolean;
}

/**
 * Home page.
 */
export function Home({ friends }: HomeInterface): JSX.Element {
  const [posts, setPosts] = useState<IPost[] | undefined>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts(friends)
      .then((posts) => {
        setPosts(posts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="Home">
      {!loading &&
        posts &&
        posts.map((post) => <Post key={post._id} post={post} isLink={true} />)}
    </div>
  );
}
