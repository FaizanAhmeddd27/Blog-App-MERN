import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const { profile } = useAuth();
  const userId = profile?._id;
  const navigate = useNavigate();
  const location = useLocation();

  const fetchMyBlogs = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`https://theinkspark.onrender.com/api/blogs/myBlogs/${userId}`, {
        withCredentials: true,
      });
      setMyBlogs(response.data.blogs || []);
      // toast.success("Blogs loaded successfully!");
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load blogs.');
      setMyBlogs([]);
      toast.error(err.response?.data?.message || "Failed to load blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, [userId]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) fetchMyBlogs();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (location.state?.refreshBlogs) {
      fetchMyBlogs();
      navigate('/myblogs', { replace: true, state: {} });
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [location.state, navigate]);

  const handleRefresh = () => {
    fetchMyBlogs();
  };

  const handleUpdate = (blog, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedBlogId(blog._id);
    navigate(`/update/${blog._id}`, { state: { blog } });
  };

  const handleDelete = async (blogId, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`https://theinkspark.onrender.com/api/blogs/delete/${blogId}`, {
          withCredentials: true,
        });
        setMyBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
        toast.success("Blog deleted successfully!");
      } catch (error) {
        toast.error('Failed to delete blog. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800 flex-1 text-center">My Blogs</h1>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-300 rounded hover:bg-blue-100 disabled:opacity-50"
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {loading ? (
          <div className="text-center text-blue-500 text-lg">Loading your blogs, please wait...</div>
        ) : error ? (
          <div className="text-center">
            <div className="text-red-500 text-lg mb-4">Error: {error}</div>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : myBlogs.length === 0 ? (
          <div className="text-center text-blue-600 text-lg">
            You haven't written any blogs yet. Start writing to see them here!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {myBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-200 hover:shadow-lg transition-shadow"
              >
                <Link to={`/blog/${blog._id}`} className="block">
                  <div className="h-40 overflow-hidden bg-blue-100">
                    <img
                      src={blog.blogImage?.url}
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                      onError={(e) => {
                        e.target.src =
                          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDIwMCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjY0IiByPSIxNiIgZmlsbD0iIzlCOUJBMCIvPgo8cGF0aCBkPSJNNzUgMTAwSDEyNUwxMTUgODVMMTAwIDk1TDg1IDg1TDc1IDEwMFoiIGZpbGw9IiM5QjlCQTAiLz4KPC9zdmc+Cg==';
                      }}
                    />
                  </div>
                </Link>

                <div className="p-4">
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded">
                      {blog.category}
                    </span>
                  </div>

                  <Link to={`/blog/${blog._id}`} className="block">
                    <h3 className="text-lg font-bold text-blue-900 mb-3 hover:text-blue-600 line-clamp-2">
                      {blog.title}
                    </h3>
                  </Link>

                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => handleUpdate(blog, e)}
                      className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-300 rounded hover:bg-blue-100"
                    >
                      UPDATE
                    </button>
                    <button
                      onClick={(e) => handleDelete(blog._id, e)}
                      className="flex-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-300 rounded hover:bg-red-100"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
