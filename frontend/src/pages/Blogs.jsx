import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import DevotionalCard from "../components/DevotionalCard";

function Blogs() {
  const { blogs } = useAuth();
  console.log(blogs);
  const allBlogs = blogs?.allBlogs || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Discover Stories
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 font-light max-w-2xl mx-auto">
            Explore our collection of inspiring blogs and devotionals
          </p>
          <div className="mt-8 w-24 h-1 bg-blue-200 mx-auto rounded-full"></div>
        </div>
        
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-300/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-blue-200/40 rounded-full blur-lg animate-bounce"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {allBlogs.length > 0 ? (
          <>
            <div className="mb-12 text-center">
              <div className="inline-flex items-center bg-blue-50/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-blue-200/30">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-blue-800 font-medium">
                    {allBlogs.length} {allBlogs.length === 1 ? 'Blog' : 'Blogs'} Available
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {allBlogs.map((blog, index) => (
                <Link
                  to={`/blog/${blog._id}`}
                  key={blog._id || index}
                  className="group block"
                >
                  <div className="transform transition-all duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-2">
                    <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 rounded-2xl"></div>
                      
                      <DevotionalCard
                        image={blog.blogImage?.url || "/placeholder.jpg"}a
                        title={blog.title}
                        adminName={blog.adminName || "Unknown"}
                        adminPhoto={blog.adminPhoto || "/default-user.png"}
                        category={blog.category}
                        about={blog.about}
                      />
                      
                      <div className="absolute top-4 right-4 w-8 h-8 bg-blue-50/95 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 z-20">
                        <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-20 text-center">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Want to share your story?
                </h3>
                <p className="text-blue-100 mb-6 max-w-md mx-auto">
                  Join our community of writers and inspire others with your unique perspective.
                </p>
                <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Start Writing
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
              
              <h3 className="text-2xl font-semibold text-blue-700 mb-4 animate-pulse">
                Loading Amazing Stories...
              </h3>
              <p className="text-blue-600 max-w-md mx-auto leading-relaxed">
                We're gathering the best content for you. This won't take long!
              </p>
              
              <div className="flex justify-center mt-6 space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogs;