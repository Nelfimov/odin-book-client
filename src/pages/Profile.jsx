import {useEffect, useState} from 'react';
import Post from '../components/Post';

/**
 * Home page.
 * @return {JSX} JSX
 */
export default function Profile() {
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
      headers,
    });
    const data = await response.json();
    if (data.success) return data.posts;
    return [];
  }

  return (
    <div className="Home">
      { !loading && posts.map(
          (post) => <Post key={post._id} post={post} isLink={true}/>,
      )}
    </div>
  );
}
