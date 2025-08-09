import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, User, Tag, Clock, Eye, Heart, Share2, ChevronUp, ArrowLeft, Bookmark } from "lucide-react";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`/api/blogs/singleBlog/${id}`);
        setBlog(data.blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchBlog();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLike = () => setIsLiked((prev) => !prev);
  const handleBookmark = () => setIsBookmarked((prev) => !prev);
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.about,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-spin"></div>
            <div className="absolute inset-1 border-4 border-indigo-300 border-t-transparent rounded-full animate-spin animate-reverse"></div>
          </div>
          <h2 className="text-lg font-semibold text-blue-600 animate-pulse">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog Not Found</h2>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mx-auto px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </div>
    );
  }

  const readingTime = Math.ceil(blog.about?.split(" ").length / 200) || 5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative">
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all"
          style={{
            width: `${Math.min((scrollY / (document.body.scrollHeight - window.innerHeight)) * 100, 100)}%`,
          }}
        />
      </div>

      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-50 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all md:top-6 md:left-6"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700" />
      </button>

      <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-100 ease-out"
          style={{
            backgroundImage: `url(${blog.blogImage?.url || "/placeholder.jpg"})`,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-6 md:pb-8 lg:pb-12">
          <div className="w-full max-w-4xl">
            <span className="inline-flex items-center bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
              <Tag className="w-4 h-4 mr-2" /> {blog.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {blog.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/90 lg:mb-15">
              <div className="flex items-center bg-white/10 rounded-full px-3 py-1 text-sm">
                <User className="w-4 h-4 mr-2" /> {blog.adminName}
              </div>
              <div className="flex items-center bg-white/10 rounded-full px-3 py-1 text-sm">
                <Calendar className="w-4 h-4 mr-2" /> {new Date().toLocaleDateString()}
              </div>
              <div className="flex items-center bg-white/10 rounded-full px-3 py-1 text-sm">
                <Clock className="w-4 h-4 mr-2" /> {readingTime} min read
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12 md:-mt-16 lg:-mt-20 relative z-20">
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">

          <div className="flex flex-col md:flex-row md:items-center gap-4 bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-4 flex-1">
              <img
                src={blog.adminPhoto || "/default-avatar.jpg"}
                alt={blog.adminName}
                className="w-12 h-12 rounded-full object-cover shadow-md"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{blog.adminName}</h3>
                <p className="text-blue-600 text-sm">Content Creator</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  isLiked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} /> {isLiked ? "Liked" : "Like"}
              </button>
              <button
                onClick={handleBookmark}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  isBookmarked
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600"
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} /> Save
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-200 transition-all"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>

          <div className="prose prose-sm md:prose-lg max-w-none text-gray-700">
            {blog.about}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex gap-4">
              <div className="flex items-center bg-gray-50 rounded-full px-3 py-1 text-sm text-gray-600">
                <Eye className="w-4 h-4 mr-2" /> 1,234 views
              </div>
            
            </div>
            <div className="text-sm text-gray-500 bg-gray-50 rounded-full px-3 py-1">
              Published {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mb-5 mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 mt-6">
          <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Related Stories
          </h3>
          <div className="text-center py-6">
            <p className="text-gray-600 text-lg">More stories coming soon...</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-4 right-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      <style jsx>{`
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }
        .animate-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </div>
  );
};

export default Detail;