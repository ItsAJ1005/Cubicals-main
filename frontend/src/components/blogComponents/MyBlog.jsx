import React from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { BLOG_API_END_POINT } from '@/utils/constant';

const MyBlog = ({ blog, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await axios.delete(
          `${BLOG_API_END_POINT}/author/delete/${blog._id}`,
          { withCredentials: true }
        );
  
        if (response.data.success) {
          toast.success(response.data.message || 'Post deleted successfully.');
          onDelete(blog._id); 
        } else {
          toast.error('Error deleting post.');
        }
      } catch (error) {
        console.error('Delete Error:', error);
        toast.error(error.response?.data?.message || 'Post deleted Sucessfully. Please refresh the page to view changes.');
      }
    }
  };
  
  return (
    <div>
      <div key={blog._id} className="blog-post m-5">
        <h3 className="font-bold text-2xl">{blog.title}</h3>
        <p>{blog.content.slice(0, 200)}...</p>
        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="mt-2 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Delete Post
        </button>
      </div>
    </div>
  );
};

export default MyBlog;
