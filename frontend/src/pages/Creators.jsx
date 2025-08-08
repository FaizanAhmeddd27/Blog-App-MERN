import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Creators = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get('/api/users/admins', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setAdmins(data);
      } catch (error) {
        toast.error('Error fetching admins:', error);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold mb-8 text-center text-blue-900">
        Our Creators
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {admins && admins.length > 0 ? (
          admins.map((admin) => (
            <div
              key={admin._id}
              className="bg-blue-900 text-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 text-center p-6 border border-blue-700"
            >
              <div className="flex justify-center">
                <img
                  src={admin.photo?.url}
                  alt={admin.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                />
              </div>
              <h2 className="mt-4 font-bold text-lg">{admin.name}</h2>
              <p className="text-sm text-blue-200">{admin.email}</p>
              <p className="text-sm text-blue-200">{admin.phone}</p>
              <p className="mt-2 text-sm font-medium text-blue-300">{admin.role}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-blue-400 col-span-full">
            No creators found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Creators;
