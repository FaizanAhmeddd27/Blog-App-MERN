// src/dashboard/Sidebar.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Sidebar = ({ component, setComponent }) => {
  const { profile, authenticated ,setAuthenticated,logout} = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (!authenticated || !profile) return null;

  const handleClick = (label) => {
    if (label === 'Home') {
      navigate('/');
    } else if (label === 'Logout') {
      handleLogout();
    } else {
      setComponent(label);
    }

    setOpen(false); 
  };



const handleLogout = async () => {
  await logout(); 
  toast.success("Logged out successfully!", {
    style: {
      background: "#2563eb", 
      color: "#fff",
    },
  });

  setTimeout(() => navigate("/login"), 0);
};

  const navItems = [
    { label: 'Create Blog', color: 'from-sky-500 to-indigo-500' },
    { label: 'My Blogs', color: 'from-green-500 to-teal-500' },
    { label: 'My Profile', color: 'from-purple-500 to-pink-500' },
    { label: 'Home', color: 'from-yellow-300 to-orange-500' },
    { label: 'Logout', color: 'from-red-500 to-red-700' },
  ];

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
      </button>

      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static top-0 left-0 h-screen md:h-auto bg-white shadow-lg transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'} w-64
          md:translate-x-0 md:w-1/5 lg:w-1/6
          flex flex-col items-center py-6 z-40 md:min-h-screen
        `}
      >
        <div className="flex flex-col items-center mb-8 px-4">
          <img
            src={profile.photo?.url}
            alt={profile.name}
            className="w-20 h-20 rounded-full object-cover mb-2 border-2 border-purple-300 shadow-md"
          />
          <h2 className="text-lg font-semibold text-center">{profile.name}</h2>
        </div>

        <nav className="flex flex-col w-full px-4 space-y-3">
          {navItems.map(({ label, color }) => (
            <button
              key={label}
              onClick={() => handleClick(label)}
              className={`w-full py-3 text-sm font-semibold text-white text-center rounded-lg bg-gradient-to-br ${color} hover:brightness-110 transition duration-300`}
            >
              {label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;