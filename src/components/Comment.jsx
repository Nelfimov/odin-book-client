import propTypes from 'prop-types';

/**
 * Comment component.
 * @param {shape} comment - Comment object from DB.
 * @return {JSX} JSX
 */
export default function Comment({comment}) {
  return (
    <div className="comment-container">

      <div className="top">
        <span>{comment.author.username}</span>
        <span>{comment.createdAt}</span>
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
