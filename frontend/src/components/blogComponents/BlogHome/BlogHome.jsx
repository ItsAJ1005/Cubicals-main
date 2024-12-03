import Navbar from '@/components/shared/Navbar';
import React, { useEffect, useState } from 'react';
import Post from '../Post';
import { Link } from 'react-router-dom';
import { BLOG_API_END_POINT } from '@/utils/constant';

const BlogHome = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${BLOG_API_END_POINT}/getPosts`)
      .then((response) => response.json())
      .then((posts) => {
        console.log(posts)
        const sortedPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
      });
  }, []);

  return (
    <div>
      <Navbar />

      <div className="head flex justify-between m-[3%]">
        <h1 className="font-extrabold text-4xl">Recent Blogs</h1>
        <div className="flex gap-3">
          <Link to="/blog/myBlogs">
            <button className="font-semibold right-2 border-2 p-1.5 bg-gray-900 text-white border-gray-950 rounded-sm hover:bg-gray-800">
              My Blogs
            </button>
          </Link>
          <Link to="/blog/createPost">
            <button className="font-semibold right-2 border-2 p-1.5 bg-gray-900 text-white border-gray-950 rounded-sm  hover:bg-gray-800">
              Create New Post
            </button>
          </Link>
        </div>
      </div>

      <main className="posts m-[3%]">
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post._id} {...post} />)
        ) : (
          <p>No posts available</p> 
        )}
      </main>
    </div>
  );
};

export default BlogHome;
