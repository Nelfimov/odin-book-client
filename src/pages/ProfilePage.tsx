import { Link, useLoaderData } from 'react-router-dom';
import { Post, Hero, Comment } from '../components';
import {
  Post as IPost,
  Comment as IComment,
  User as IUser,
} from '../types/common';
import '../styles/ProfilePage.css';

interface Loader {
  user: IUser;
  userPosts: IPost[];
  userComments: IComment[];
}

export function ProfilePage(): JSX.Element {
  const { userPosts: posts, userComments: comments } =
    useLoaderData() as Loader;

  function handleToggle() {
    document.getElementById('posts-container')?.classList.toggle('hide');
  }

  return (
    <div className="Profile">
      <div className="user-info">{<Hero />}</div>
      <div className="controls">
        <label className="toggle">
          <input type="checkbox" onChange={handleToggle} />
          <span className="labels" data-on="Comments" data-off="Posts"></span>
        </label>
      </div>
      <div className="posts-and-comments">
        <div id="posts-container">
          <h2>Recent posts</h2>
          {posts &&
            posts.map((post: IPost) => (
              <Post key={post._id} post={post} isLink={true} />
            ))}
        </div>
        <div className="comments-container">
          <h2>Recent comments</h2>
          {comments && (
            <div className="comments">
              {comments.map((comment: IComment) => {
                return (
                  <Link key={comment._id} to={`/posts/${comment.post}`}>
                    <Comment comment={comment} />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
