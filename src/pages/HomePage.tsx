import { useCallback, useEffect, useRef, useState } from 'react';
import { Post } from '../components/index';
import { getPosts } from '../api/index';
import { Post as IPost } from '../types/common/index';
import { useLoaderData } from 'react-router-dom';

interface HomeInterface {
  friends: boolean;
}

/**
 * Home page.
 */
export function HomePage({ friends }: HomeInterface): JSX.Element {
  const loadedPosts = useLoaderData() as IPost[];
  const [posts, setPosts] = useState<IPost[]>(loadedPosts);
  const [lastPost, setLastPost] = useState<HTMLDivElement | null>();
  const [morePosts, setMorePosts] = useState(true);
  const [skip, setSkip] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const callback: IntersectionObserverCallback = useCallback(
    (entries) => {
      const first = entries[0];
      if (first.isIntersecting && morePosts) {
        setSkip((prev) => prev + 5);
      }
    },
    [posts]
  );

  const observer = useRef(new IntersectionObserver(callback));

  useEffect(() => {
    morePosts &&
      getPosts(friends, skip)
        .then((posts) => {
          if (posts.length <= 0) {
            setMorePosts(false);
            return;
          }
          setPosts((prev) => {
            const idArray = prev.map((post) => post._id);
            return [
              ...prev,
              ...posts.filter((post) => !idArray.includes(post._id)),
            ];
          });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [skip]);

  useEffect(() => {
    const currentPost = lastPost;
    const currentObserver = observer.current;

    if (currentPost) {
      currentObserver.observe(currentPost);
    }

    return () => {
      currentPost && currentObserver.unobserve(currentPost);
    };
  }, [lastPost]);

  return (
    <div className="Home">
      {!loading &&
        posts &&
        posts.map((post, index) => {
          if (index === posts.length - 1) {
            return (
              <div key={post._id} ref={setLastPost}>
                <Post post={post} isLink={true} />
              </div>
            );
          }
          return (
            <div key={post._id}>
              <Post post={post} isLink={true} />
            </div>
          );
        })}
    </div>
  );
}
