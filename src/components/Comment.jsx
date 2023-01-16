import propTypes from 'prop-types';
import '../styles/Comment.css';

/**
 * Comment component.
 * @param {shape} comment - Comment object from DB.
 * @return {JSX} JSX
 */
export default function Comment({comment}) {
  return (
    <div className="comment-container">

      <div className="top">
        <span className='username'>{comment.author.username}</span>
        <span>{new Date(comment.createdAt).toDateString()}</span>
      </div>

      <p>{comment.text}</p>

      <div className="bottom">

      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: propTypes.object.isRequired,
};
