import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import '../styles/Post.css';

/**
 * Post component.
 * @param {shape} post Post object
 * @return {JSX} JSX
 */
export default function Post({post, isLink}) {
  /**
   * Like current post.
   * @param {shape} e Event.
   */
  async function likePost(e) {
    e.stopPropagation();
    const postID = e.currentTarget.dataset.post;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': JSON.parse(localStorage.getItem('token')),
    });
    const response = await fetch(
        `http://localhost:3000/posts/${postID}/like`, {
          headers,
        },
    );
    const data = await response.json();
    if (!data.success) return console.log(data.message);
  }

  return (
    <div className="post-container">

      {
        isLink ?
          <Link to={`posts/${post._id}`}>
            <div className="top">
              <span>{post.author.username}</span>
              <span>{new Date(post.createdAt).toDateString()}</span>
            </div>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
          </Link> :
          <>
            <div className="top">
              <span>{post.author.username}</span>
              <span>{new Date(post.createdAt).toDateString()}</span>
            </div>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
          </>
      }

      <div className="bottom">

        <button data-post={post._id} type='button' onClick={likePost}>
          <img src="/images/icons/like.svg" alt="like" />
          {post.likes.count}
        </button>

        {
          isLink && <Link to={`posts/${post._id}#comments`} >
            <img src="/images/icons/comment.svg" alt="comments" />
          </ Link>
        }

      </div>

    </div>
  );
}

Post.propTypes = {
  post: propTypes.object.isRequired,
  isLink: propTypes.bool.isRequired,
};
