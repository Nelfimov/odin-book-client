import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Post from '../components/Post';

/**
 * Profile page.
 * @return {JSX} JSX
 */
export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {userID} = useParams();

  useEffect(() => {
    getPosts(userID)
        .then((posts) => {
          setPosts(posts);
          setLoading(false);
        })
        .catch((err) => console.log(err));
  }, []);

  /**
   * Get posts.
   * @param {string} id ID of user.
   */
  async function getPosts(id) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': JSON.parse(localStorage.getItem('token')),
    });
    const response = await fetch(`http://localhost:3000/profile/${userID}/posts`, {
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
