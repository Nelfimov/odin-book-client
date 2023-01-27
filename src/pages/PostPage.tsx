import { useEffect, useState, useRef, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import {
  Post as PostComponent,
  Comment as CommentComponent,
} from '../components';
import { Comment, Post } from '../types/common';
import { createComment, getComments, getPost } from '../api';
import '../styles/PostPage.css';

/**
 * Post page.
 */
export function PostPage(): JSX.Element {
  const { postID } = useParams();
  const [post, setPost] = useState<Post | null>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const commentText = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!postID) return;

    getPost(postID)
      .then((post) => {
        setPost(post);
        setLoadingPosts(false);
      })
      .catch((err) => {
        console.log(err);
      });
    getComments(postID)
      .then((comments) => {
        setComments(comments);
        setLoadingComments(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    const element = commentText.current as HTMLTextAreaElement;

    if (!postID) {
      throw new TypeError('postID is not defined');
    }

    createComment(postID, element.value)
      .then(async (result: boolean) => {
        if (result) {
          setComments(await getComments(postID));
          element.value = '';
        }
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }

  return (
    <div className="Post">
      {loadingPosts ? (
        <p>Loading</p>
      ) : (
        post != null && <PostComponent post={post} isLink={false} />
      )}
      <div className="comments-container">
        <form onSubmit={handleSubmit}>
          <textarea
            ref={commentText}
            name="column"
            id="column"
            rows={5}
          ></textarea>
          <button>Submit comment</button>
        </form>
        <div className="comments" id="comments">
          {loadingComments ? (
            <p>Loading</p>
          ) : comments !== undefined ? (
            comments.map((comment: Comment) => {
              return <CommentComponent key={comment._id} comment={comment} />;
            })
          ) : null}
        </div>
      </div>
    </div>
  );
}
