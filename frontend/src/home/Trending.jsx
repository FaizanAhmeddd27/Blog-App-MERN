import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import TrendingCard from '../components/TrendingCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Trending = () => {
  const { blogs } = useAuth();
  const allBlogs = blogs?.allBlogs || [];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <h1 className="text-2xl text-blue-700 font-bold text-center mb-4 mt-8">Trending Blogs</h1>

      <div className="container mx-auto my-6 px-4 sm:px-6 lg:px-8 w-full">
        {allBlogs.length > 0 ? (
          <Carousel
            responsive={responsive}
            infinite
            autoPlay
            autoPlaySpeed={3000}
            keyBoardControl
            swipeable
            draggable
            containerClass="w-full"
            itemClass="!flex justify-center"
          >
            {allBlogs.slice(0, 6).map((blog) => (
              <div key={blog._id} className="px-3">
                <Link to={`/blog/${blog._id}`}>
                  <TrendingCard
                    image={blog.blogImage?.url}
                    title={blog.title}
                    adminName={blog.adminName || 'Unknown'}
                    adminPhoto={blog.adminPhoto}
                    category={blog.category}
                    about={blog.about}
                  />
                </Link>
              </div>
            ))}
          </Carousel>
        ) : (
          <p className="text-gray-500 text-center">No trending blogs available.</p>
        )}
      </div>
    </>
  );
};

export default Trending;