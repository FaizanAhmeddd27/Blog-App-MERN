import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [about, setAbout] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`https://theinkspark.onrender.com/api/blogs/singleBlog/${id}`, {
          withCredentials: true,
        });
        const blog = data.blog;
        setTitle(blog.title);
        setCategory(blog.category);
        setAbout(blog.about || '');
        setPreviewImage(blog.blogImage?.url || null);
      } catch (error) {
        // console.error('Error fetching blog:', error.response?.data?.message || error.message);
        toast.error('Failed to load blog');
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category);
      formData.append('about', about);
      if (image) {
        formData.append('blogImage', image);
      }

      await axios.put(`/api/blogs/update/${id}`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Blog updated successfully!');
      navigate('/myblogs');
    } catch (error) {
      // console.error('Update error:', error.response?.data?.message || error.message);
      toast.error('Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-blue-200 shadow-xl">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-800">Update Blog</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog Title"
            className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />

          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Blog Category"
            className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />

          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Write about the blog..."
            className="w-full px-4 py-3 border border-blue-300 rounded-xl h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
          ></textarea>

          {previewImage && (
            <div className="mb-4">
              <h3 className="text-md text-blue-700 mb-2 font-semibold">Current Blog Image:</h3>
              <img
                src={previewImage}
                alt="Current blog"
                className="w-20 h-20 object-cover rounded-xl border border-blue-200 shadow-sm mb-2"
              />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full text-sm text-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-bold text-white rounded-xl transition duration-300 ${
              loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Updating...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;