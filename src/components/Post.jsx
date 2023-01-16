import propTypes from 'prop-types';
import '../styles/Post.css';

/**
 * Post component.
 * @param {shape} post Post object
 * @return {JSX} JSX
 */
export default function Post({post, isLink}) {
  return (
    <div className="post-container">

      <a href={`posts/${post._id}`}>

        <div className="top">
          <span className='username'>{post.author.username}</span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>

        <h2>{post.title}</h2>

        <p>{post.text}</p>
      </a>

      <div className="bottom">

        <button type='button'>
          <img src="/images/icons/like.svg" alt="like" />
          {post.likes.count}
        </button>

        <a href={`posts/${post._id}#comments`}>
          <img src="/images/icons/comment.svg" alt="comments" />
        </a>

      </div>

    </div>
  );
}

Post.propTypes = {
  post: propTypes.object.isRequired,
  isLink: propTypes.bool.isRequired,
};
