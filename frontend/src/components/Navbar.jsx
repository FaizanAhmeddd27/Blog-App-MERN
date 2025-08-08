import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { authenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logout Successful", {
      style: {
        background: "#2563eb", 
        color: "#fff",
      },
    });
    navigate("/login");
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
    { name: "Creators", path: "/creators" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="shadow-md bg-white sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4 py-2">

        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
            >
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-gray-700 hover:text-blue-700">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                {authenticated ? (
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-800"
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/login" className="text-gray-700 hover:text-blue-700">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>

          <Link to="/" className="text-2xl font-bold text-blue-700">
            InkSpark
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  className="text-gray-700 hover:text-blue-700 hover:bg-transparent rounded-none transition-all duration-200"
                  to={item.path}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end space-x-2">
          <Link to="/dashboard">
            <button className="btn btn-outline btn-sm border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200">
              Dashboard
            </button>
          </Link>

          {authenticated ? (
            <button
              onClick={handleLogout}
              className="btn btn-sm bg-red-600 text-white hover:bg-red-700 transition-all duration-200"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
