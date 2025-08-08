import axios from "axios";
import React, { useEffect, useState } from "react";

function Creator() {
  const [admin, setAdmin] = useState([]);
  // console.log(admin);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get("/api/users/admins", {
          withCredentials: true,
        });
        // console.log(data);
        setAdmin(data);
      } catch (error) {
        toast.error("Error fetching admins:", error);
      }
    };
    fetchAdmins();
  }, []);

  return (
    <div className="container mx-auto p-2 sm:p-4">
      <h1 className="text-xl sm:text-2xl text-blue-700 text-center font-bold mb-4 sm:mb-6">
        Popular Creators
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 rounded-full my-3 sm:my-5">
        {admin && admin.length > 0 ? (
          admin.slice(0, 4).map((element) => (
            <div key={element._id} className="flex justify-center">
              <div className="text-center">
                <img
                  src={element.photo.url}
                  alt="blog"
                  className="w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 object-cover border border-blue-300 rounded-full"
                />
                <div className="mt-2">
                  <p className="text-base sm:text-lg font-medium text-blue-800">
                    {element.name}
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm">{element.role}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-blue-600">No creators available.</div>
        )}
      </div>
    </div>
  );
}

export default Creator;