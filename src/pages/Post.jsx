import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Post as PostComponent} from '../components';

/**
 * Post page.
 * @return {JSX} JSX
 */
export default function Post() {
  const {postID} = useParams();
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': JSON.parse(localStorage.getItem('token')),
    });

    fetch(
        `http://localhost:3000/posts/${postID}`, {
          headers,
        },
    )
        .then((result) => result.json())
        .then((data) => {
          if (data.success) {
            setPost(data.post);
          } else {
            throw new Error('No post');
          }
          setLoading(false);
        })
        .catch((err) => console.log(err));
  }, []);

  return (
    <div className="Post">
      { loading ?
        <p>Loading</p> :
        <PostComponent post={post} />
      }
    </div>
  );
}
