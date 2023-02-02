import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Post, Hero, Comment } from '../components';
import { Post as IPost, Comment as IComment } from '../types/common';
import { getUserPosts, getUserComments } from '../api';
import '../styles/ProfilePage.css';

export function ProfilePage(): JSX.Element {
  const [posts, setPosts] = useState<IPost[]>();
  const [loadingPosts, setLoadingPosts] = useState<boolean>(true);
  const [comments, setComments] = useState<IComment[]>();
  const [loadingComments, setLoadingComments] = useState<boolean>(true);

  const { userID } = useParams();

  useEffect(() => {
    if (userID) {
      getUserPosts(userID)
        .then((posts) => {
          setPosts(posts);
          setLoadingPosts(false);
        })
        .catch((err) => {
          console.log(err);
        });
      getUserComments(userID)
        .then((comments) => {
          if (comments != null) {
            setComments(comments);
            setLoadingComments(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userID]);

  return (
    <div className="Profile">
      <div className="user-info">{userID && <Hero id={userID} />}</div>
      <h2>Recent posts</h2>
      {!loadingPosts &&
        posts != null &&
        posts.map((post: IPost) => (
          <Post key={post._id} post={post} isLink={true} />
        ))}
      <h2>Recent comments</h2>
      {comments && comments.length > 0 && (
        <div className="comments-container">
          <div className="comments">
            {!loadingComments &&
              comments != null &&
              comments.map((comment: IComment) => {
                return (
                  <Link key={comment._id} to={`/posts/${comment.post}`}>
                    <Comment comment={comment} />
                  </Link>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
