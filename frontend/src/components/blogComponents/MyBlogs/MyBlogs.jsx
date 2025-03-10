import Navbar from '@/components/shared/Navbar';
import { BLOG_API_END_POINT } from '@/utils/constant';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MyBlog from '../MyBlog';
import backButton from '@/assets/backButton.png';
import { Button } from '@mui/material';

const MyBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((store) => store.auth); 

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${BLOG_API_END_POINT}/author/${user?._id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(blogs)

        const data = await response.json();
        setBlogs(data.blogs || data || []);
      } catch (err) {
        setError("Error fetching blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [user, navigate]);

  if (loading) return <p>Loading blogs...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <Navbar />
      <div className='m-10'>
        <Link to='/blog'><Button><img src={backButton} alt="Back" width='40rem'/></Button></Link>
        <h2 className="font-bold text-3xl mb-5">My Blogs</h2>

        {blogs.length === 0 ? (
          <p>No blogs found</p>
        ) : (
          <div className="blogs-list flex gap-9">
            {blogs.map((blog) => (
              <MyBlog key={blog._id} blog={blog}/>
            ))}
          </div>
        )}
        </div>
      </div>
  );
};

export default MyBlogs;
