import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-auto flex flex-col">
      {/* Fixed Support Banner */}
      <div className="bg-orange-800 text-white text-sm flex justify-between items-center px-6 py-3 fixed top-0 left-0 w-full z-50">
        <p>Support Today, Thrive Tomorrow</p>
        <div className="hidden md:flex items-center space-x-4">
          <span>Email: HandsofChange@gmail.com | Phone: +25078877777</span>
          <span>
            <i className="fab fa-facebook mx-1 text-2xl hover:text-gray-400 transition"></i>
            <i className="fab fa-instagram mx-1 text-2xl hover:text-gray-400 transition"></i>
            <i className="fab fa-twitter mx-1 text-2xl hover:text-gray-400 transition"></i>
          </span>
        </div>
      </div>

      {/* Fixed Navbar */}
      <nav className="fixed top-12 left-0 w-full bg-white shadow-lg px-6 py-4 z-50 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img 
            src="/images/gift.jpg"  // Replace with your actual logo path
            alt="Ganza-Inema Fair Trade Logo" 
            className="h-10 w-10 md:h-12 md:w-12 object-contain"
          />
          <h1 className="text-orange-600 text-2xl md:text-3xl font-bold tracking-tight">
            Ganza-Inema <span className="text-orange-800">Fair Trade</span>
          </h1>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-orange-600 text-3xl">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Nav Links */}
        <ul
          className={`absolute md:static bg-white w-full md:w-auto left-0 top-20 md:top-0 md:flex space-x-6 text-gray-800 font-semibold transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}
        >
          {[
            { to: '/', label: 'Home' },
            { to: '/Aboutus', label: 'About Us' },
            { to: '/Gallery', label: 'Gallery' },
            { to: '/EventDetails', label: 'Events' },
            { to: '/contactus', label: 'Contact Us' },
            { to: '/MoreBlogs', label: 'Blogs' },
          ].map((item, index) => (
            <li key={index} className="hover:bg-orange-100 px-4 py-2 rounded-lg transition duration-300">
              <NavLink
                to={item.to}
                className={({ isActive }) => isActive ? "text-orange-600 font-bold" : "hover:text-orange-600"}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Donate Button */}
        <Link
          to="/donate"
          className="hidden md:block bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition duration-300"
        >
          Donate Now
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
