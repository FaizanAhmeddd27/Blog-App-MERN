import React from "react";

const DevotionalCard = ({ image, title, adminName, adminPhoto, category, about }) => {
  return (
    <div className="w-80 bg-white rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 shadow-md hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] group">
     <figure className="aspect-[4/3] w-full overflow-hidden">
  <img
    src={image}
    alt={title}
    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
  />
</figure>


      <div className="p-3 space-y-2">
        <span className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-pink-100 to-yellow-100 text-pink-600 rounded-full">
          {category}
        </span>
        <h2 className="text-base font-semibold text-gray-800 line-clamp-2">{title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{about}</p>
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

export default DevotionalCard;
