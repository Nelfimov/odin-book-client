import {useEffect, useState, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {Post as PostComponent} from '../components';
import {Comment as CommentComponent} from '../components';
import '../styles/PostPage.css';

/**
 * Post page.
 * @return {JSX} JSX
 */
export default function Post() {
  const {postID} = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const commentText = useRef();

  useEffect(() => {
    getPost()
        .then((post) => {
          setPost(post);
          setLoadingPosts(false);
        })
        .catch((err) => console.log(err));
    getComments()
        .then((comments) => {
          setComments(comments);
          setLoadingComments(false);
        })
        .catch((err) => console.log(err));
  }, []);

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': JSON.parse(localStorage.getItem('token')),
  });

  /**
   * Get comments to current post.
   * @return {object} Post
   */
  async function getComments() {
    try {
      const response = await fetch(
          `http://localhost:3000/posts/${postID}/comments`, {
            headers,
          },
      );
      const data = await response.json();
      if (data.success) return data.comments;
      return [];
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Get single post.
   * @return {shape} Comment.
   */
  async function getPost() {
    try {
      const response = await fetch(
          `http://localhost:3000/posts/${postID}`, {
            headers,
          },
      );
      const data = await response.json();

      if (data.success) return data.post;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Create comment.
   * @param {shape} e Event
   */
  async function createComment(e) {
    try {
      e.preventDefault();

      const response = await fetch(
          `http://localhost:3000/posts/${postID}/comments`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              text: commentText.current.value,
            }),
          },
      );
      const data = await response.json();
      if (data.success) {
        setComments(await getComments());
        commentText.current.value = '';
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="Post">
      {
        loadingPosts ?
        <p>Loading</p> :
        <PostComponent post={post} isLink={false} />
      }
      <div className="comments-container">
        <form onSubmit={createComment}>
          <textarea ref={commentText} name="column" id="column" rows="5">

          </textarea>
          <button>Submit comment</button>
        </form>
        <div className="comments" id='comments'>
          {
            loadingComments ?
            <p>Loading</p> :
            comments.map((comment) =>
              <CommentComponent key={comment._id} comment={comment} />,
            )
          }
        </div>
      </div>
    </div>
  );
}
