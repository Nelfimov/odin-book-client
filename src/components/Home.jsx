import {useEffect, useState} from 'react';
import Post from './Post';

/**
 * Home page.
 * @return {JSX} JSX
 */
export default function Home() {
  const [posts, setPosts] = useState([]);

  /**
   * Get posts.
   */
  async function getPosts() {
    const response = await fetch('http://localhost:3000/posts');
    const data = await JSON.parse(response);
    const {posts} = data;
    return posts;
  }

  useEffect(() => {
    setPosts(getPosts());
  });

  return (
    <main>
      {posts.forEach((post) => <Post post={post}/>)}
    </main>
  );
}
