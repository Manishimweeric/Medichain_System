import React from 'react';
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="h-auto flex flex-col">
      {/* Fixed Support Banner */}
      <div className="bg-orange-800 text-white text-sm flex justify-between items-center px-6 py-3 fixed top-0 left-0 w-full z-50">
        <p>Support Today, Thrive Tomorrow</p>
        <div className="flex items-center space-x-4">
          <span>Email: HandsofChange@gmail.com | Phone: +25078877777</span>
          <span>
            <i className="fab fa-facebook mx-1 text-2xl hover:text-gray-400 transition"></i>
            <i className="fab fa-instagram mx-1 text-2xl hover:text-gray-400 transition"></i>
            <i className="fab fa-twitter mx-1 text-2xl hover:text-gray-400 transition"></i>
          </span>
        </div>
      </div>

      {/* Fixed Navbar */}
      <nav className="fixed top-12 left-0 w-full bg-white shadow-lg px-6 py-4 flex flex-col md:flex-row justify-between items-center z-50">
        <h1 className="text-orange-600 text-3xl font-bold tracking-tight">
          Hands <span className="text-orange-800">Of Change</span>
        </h1>

        <ul className="flex space-x-6 text-gray-800 font-semibold">
          <li className="hover:bg-orange-100 px-4 py-2 rounded-lg transition duration-300">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? "text-orange-600 font-bold" : "hover:text-orange-600"}
            >
              Home
            </NavLink>
          </li>
          <li className="hover:bg-orange-100 px-4 py-2 rounded-lg transition duration-300">
            <NavLink 
              to="/Aboutus" 
              className={({ isActive }) => isActive ? "text-orange-600 font-bold" : "hover:text-orange-600"}
            >
              About Us
            </NavLink>
            
          </li>
          <li className="hover:bg-orange-100 px-4 py-2 rounded-lg transition duration-300">
            <NavLink 
              to="/Gallery" 
              className={({ isActive }) => isActive ? "text-orange-600 font-bold" : "hover:text-orange-600"}
            >
              Gallery
            </NavLink>
            </li>
          <li className="hover:bg-orange-100 px-4 py-2 rounded-lg transition duration-300">
            <NavLink 
              to="/EventDetails" 
              className={({ isActive }) => isActive ? "text-orange-600 font-bold" : "hover:text-orange-600"}
            >
              Events
            </NavLink>
          </li>
          <li className="hover:bg-orange-100 px-4 py-2 rounded-lg transition duration-300">
            <NavLink 
              to="/contactus" 
              className={({ isActive }) => isActive ? "text-orange-600 font-bold" : "hover:text-orange-600"}
            >
              Contact Us
            </NavLink>
          </li>
          <li className="hover:bg-orange-100 px-4 py-2 rounded-lg transition duration-300">
            <NavLink 
              to="/MoreBlogs" 
              className={({ isActive }) => isActive ? "text-orange-600 font-bold" : "hover:text-orange-600"}
            >
              Blogs
            </NavLink>
          </li>
        </ul>

        <Link 
          to="/donate" 
          className="bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition duration-300"
        >
          Donate Now
        </Link>
     
      </nav>

    </div>
  );
};

export default Navbar;
