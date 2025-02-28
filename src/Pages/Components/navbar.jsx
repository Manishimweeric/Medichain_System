import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setDropdown(null);
  };

  return (
    <div className="h-auto flex flex-col">
      <div className="bg-gray-900 text-white text-sm px-6 py-3 w-full z-50 overflow-hidden relative">
        <p className="whitespace-nowrap animate-[marquee_30s_linear_infinite]">
          Welcome to Medicain System - Improving Healthcare Supply Chains
        </p>
      </div>



      <nav className="fixed top-10 left-0 w-full bg-gray-800 shadow-lg px-2 md:px-6 py-4 z-50 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img 
            src="/images/medlogo.png" // Keep the original image path
            alt="Medicain System Logo" 
            className="h-10 w-10 md:h-12 md:w-12 object-contain"
          />
          <h1 className="text-orange-500 text-xl md:text-3xl font-bold tracking-tight">
            Medicain <span className="text-white">System</span>
          </h1>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-orange-500 text-3xl">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <ul
          className={`absolute md:static bg-gray-800 w-full md:w-auto left-0 top-20 md:top-0 md:flex space-x-6 text-gray-300 font-semibold transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}
        >
          {/* Home */}
          <li className="hover:bg-gray-700 px-4 py-2 rounded-lg transition duration-300">
            <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? "text-orange-500 font-bold" : "hover:text-orange-500"}>
              Home
            </NavLink>
          </li>

          {/* Features Dropdown */}
          <li className="relative hover:bg-gray-700 px-4 py-2 rounded-lg transition duration-300"
           
          >
            <NavLink to="" className="hover:text-orange-500">
              Features
            </NavLink>
            
          </li>

          {/* Contact Us */}
          <li className="hover:bg-gray-700 px-4 py-2 rounded-lg transition duration-300">
            <NavLink to="" onClick={closeMenu} className="hover:text-orange-500">
              Contact Us
            </NavLink>
          </li>
          {/* Other Links */}
          <li className="hover:bg-gray-700 px-4 py-2 rounded-lg transition duration-300">
            <NavLink to="" onClick={closeMenu} className="hover:text-orange-500">
              About Us
            </NavLink>
          </li>

          {/* Login Link in Responsive View */}
          <li className="hover:bg-gray-700 px-4 py-2 rounded-lg transition duration-300 md:hidden">
            <Link
              to="/login"
              className="flex items-center justify-center text-orange-500"
              onClick={closeMenu}
            >
              <i className="fas fa-user mr-1"></i> 
              Login
            </Link>
          </li>
        </ul>

        <Link
          to="/login"
          className="hidden md:block bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition duration-300 flex items-center justify-center"
        >
          <i className="fas fa-user mr-1"></i> {/* User Icon */}
          Login
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;