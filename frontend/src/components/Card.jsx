import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ id, image, title, adminName, adminPhoto, category, about }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${id}`); 
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer w-64 sm:w-44 md:w-52 lg:w-64 bg-white rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 shadow-md hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] group"
    >
      <figure className="h-40 sm:h-36 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </figure>

      <div className="p-3 space-y-2">
        {category && (
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-indigo-100 to-blue-100 text-blue-600 rounded-full">
            {category}
          </span>
        )}
        <h2 className="text-base font-semibold text-gray-800 line-clamp-2">
          {title}
        </h2>
        {about && <p className="text-sm text-gray-600 line-clamp-2">{about}</p>}
      </div>

      <div className="flex items-center gap-3 px-3 pb-4">
        <img
          src={adminPhoto}
          alt={adminName}
          className="w-9 h-9 rounded-full border border-gray-300"
        />
        <p className="text-sm font-medium text-gray-700">{adminName}</p>
      </div>
    </div>
  );
};

export default Card;
