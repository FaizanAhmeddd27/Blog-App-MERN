import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer className="bg-slate-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <div>
            <h2 className="text-xl font-bold mb-4">Products</h2>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">NextJS</a></li>
              <li><a href="#" className="hover:text-white">React</a></li>
              <li><a href="#" className="hover:text-white">Android</a></li>
              <li><a href="#" className="hover:text-white">iOS</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Design to Code</h2>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">Figma Plugin</a></li>
              <li><a href="#" className="hover:text-white">Templates</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Comparison</h2>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">DhiWise vs Anima</a></li>
              <li><a href="#" className="hover:text-white">DhiWise vs Appsmith</a></li>
              <li><a href="#" className="hover:text-white">DhiWise vs FlutterFlow</a></li>
              <li><a href="#" className="hover:text-white">DhiWise vs Monday Hero</a></li>
              <li><a href="#" className="hover:text-white">DhiWise vs Retool</a></li>
              <li><a href="#" className="hover:text-white">DhiWise vs Bubble</a></li>
              <li><a href="#" className="hover:text-white">DhiWise vs Figma Dev Mode</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Company</h2>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Career</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-lg font-bold">
            Ink<span className="text-blue-500">Spark</span>
          </div>
          <div className="text-gray-400 text-sm">
            © 2025 DhiWise PVT. LTD. All rights reserved.
          </div>
          <div className="flex space-x-5">
            <a href="#" className="hover:text-blue-400 transition duration-300 transform hover:scale-110">
              <FaGithub size={22} />
            </a>
            <a href="#" className="hover:text-red-500 transition duration-300 transform hover:scale-110">
              <BsYoutube size={22} />
            </a>
            <a href="#" className="hover:text-blue-600 transition duration-300 transform hover:scale-110">
              <FaLinkedin size={22} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
