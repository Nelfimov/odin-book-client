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
  const [posts, setPosts] = useState<IPost[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts(friends, 0)
      .then((posts) => {
        setPosts(posts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getPosts(friends, skip).then((posts) => {
      setPosts((prev) => [...prev, ...posts]);
    });
  }, [skip]);

  return (
    <div className="Home">
      {!loading &&
        posts &&
        posts.map((post) => <Post key={post._id} post={post} isLink={true} />)}
    </div>
  );
}
