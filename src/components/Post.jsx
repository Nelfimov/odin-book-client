import propTypes from 'prop-types';
import '../styles/Post.css';

/**
 * Post component.
 * @param {shape} post Post object
 * @return {JSX} JSX
 */
export default function Post({post}) {
  return (
    <div className="post-container">
      <div className="top">
        <span>{post.author.username}</span>
        <span>{new Date(post.createdAt).toDateString()}</span>
      </div>
      <h2>{post.title}</h2>
      <p>{post.text}</p>
      <div className="bottom">
        <button type='button'>
          <img src="images/icons/like.svg" alt="like" />
          {post.likes.count}
        </button>
        <a href="http://">
          <img src="images/icons/comment.svg" alt="comments" />
        </a>
      </div>
    </div>
  );
}

Post.propTypes = {
  post: propTypes.object.isRequired,
};
