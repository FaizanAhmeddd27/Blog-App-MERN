import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import DevotionalCard from "../components/DevotionalCard";

function Devotional() {
  const { blogs } = useAuth();
  const allBlogs = blogs?.allBlogs || [];
  const devotionalBlogs = allBlogs.filter(
    (blog) => blog.category === "Devotional"
  );

  return (
    <div>
      <div className="container sm:mx-auto md:mx-16 lg:mx-auto my-12 px-2">
        <h1 className="text-2xl text-blue-700 font-bold mb-6 text-center">Devotional</h1>
        <p className="text-start mb-8">
          The concept of gods varies widely across different cultures,
          religions, and belief systems.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {devotionalBlogs && devotionalBlogs.length > 0 ? (
            devotionalBlogs.map((blog, index) => (
              <Link to={`/blog/${blog._id}`} key={index} className="mb-6 block">
                <DevotionalCard
                  image={blog.blogImage?.url}
                  title={blog.title}
                  adminName={blog.adminName || "Unknown"}
                  adminPhoto={blog.adminPhoto}
                  category={blog.category}
                  about={blog.about}
                />
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              Loading…
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Devotional;
