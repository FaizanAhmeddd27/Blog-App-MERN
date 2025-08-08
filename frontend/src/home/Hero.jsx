import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const Hero = () => {
  const { blogs } = useAuth();
  const allBlogs = blogs?.allBlogs || [];

  return (
    <div className="flex flex-wrap gap-6 justify-center py-6">
      {allBlogs.length > 0 ? (
        allBlogs.slice(0, 4).map((blog) => (
          <Link to={`/blog/${blog._id}`} key={blog._id}>
        <Card
  image={blog.blogImage?.url}
  title={blog.title}
  adminName={blog.adminName || "Unknown"}
  adminPhoto={blog.adminPhoto }
/>

          </Link>
        ))
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
};

export default Hero;
