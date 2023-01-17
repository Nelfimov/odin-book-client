import {useEffect, useState} from 'react';
import Post from '../components/Post';
import propTypes from 'prop-types';

/**
 * Home page.
 * @return {JSX} JSX
 */
export default function Home({friends}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts(friends)
        .then((posts) => {
          setPosts(posts);
          setLoading(false);
        })
        .catch((err) => console.log(err));
  }, []);

  /**
   * Get posts.
   * @param {bool} bool - should it get from friends.
   */
  async function getPosts(bool) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': JSON.parse(localStorage.getItem('token')),
    });
    let url = 'http://localhost:3000/posts';
    if (bool) url += '/friends';
    const response = await fetch(url, {
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

Home.propTypes = {
  friends: propTypes.bool.isRequired,
};
