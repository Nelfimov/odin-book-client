import {useEffect, useState} from 'react';
import Post from './Post';

/**
 * Home page.
 * @return {JSX} JSX
 */
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
        .then((posts) => {
          setPosts(posts);
          setLoading(false);
        })
        .catch((err) => console.log(err));
  }, []);

  /**
   * Get posts.
   */
  async function getPosts() {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': JSON.parse(localStorage.getItem('token')),
    });
    const response = await fetch('http://localhost:3000/posts', {
      method: 'GET',
      headers,
    });
    const data = await response.json();
    if (data.success) return data.posts;
    return [];
  }

  return (
    <main>
      { !loading && posts.map((post) => <Post key={post._id} post={post}/>)}
    </main>
  );
}
