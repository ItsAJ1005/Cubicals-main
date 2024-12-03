import React, { useState } from 'react';
import axios from 'axios';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';
import { BLOG_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'

export default function CreatePostForm() {
  // const [value, setValue] = useState('');
  const { user } = useSelector((store) => store.auth);
  const [redirect, setRedirect ] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    image: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            toast.error("Invalid file type. Only PNG, JPG, and GIF are allowed.");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            toast.error("File size exceeds 10MB.");
            return;
        }
        setFormData({ ...formData, image: file });
    }
};


  const createPostSubmitHandler = async (e) => {
    e.preventDefault();
    const { title, content, tags, image } = formData;
    // console.log(user)
    if (!user) {
      return alert('User not authenticated');
    }

    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('tags', tags);
    if (image) {
      postData.append('image', image);
    }
    postData.append('author', user._id);

    try {
      const res = await axios.post(`${BLOG_API_END_POINT}/createPost`, postData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setFormData({ title: '', content: '', tags: '', image: null });
        navigate('/blog');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <form onSubmit={createPostSubmitHandler}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-bold text-gray-900">Create a New Post</h2>
          <p className="mt-1 text-lg text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-xl font-medium text-gray-900">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleInputChange}
                placeholder="My New Job/Experience..."
                className="block w-full py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 outline outline-1 outline-gray-300 focus:outline-indigo-600"
              />
            </div>

            <div className="col-span-full">
              <label htmlFor="content" className="block text-xl font-medium text-gray-900">
                Description
              </label>
              <textarea
                id="content"
                name="content"
                rows={3}
                required
                value={formData.content}
                onChange={handleInputChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline outline-1 outline-gray-300 focus:outline-indigo-600"
                placeholder="Today, I would like to share..."
              />
               {/* <ReactQuill rows={3} className='col-span-full' theme="snow" value={value} onChange={setValue} /> */}

              <p className="mt-3 text-sm text-gray-600">
                Write a few sentences that you would like to share.
              </p>
            </div>


            <div className="sm:col-span-4">
              <label htmlFor="tags" className="block text-xl font-medium text-gray-900">
                Tags
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                required
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Any tags"
                className="block w-full py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 outline outline-1 outline-gray-300 focus:outline-indigo-600"
              />
            </div>

            <div className="col-span-full">
              <label htmlFor="image" className="block text-xl font-medium text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                  <div className="mt-4 flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link to="/blog">
          <button type="button" className="font-semibold text-gray-900">
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
