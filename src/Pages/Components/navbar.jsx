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

      <nav className="fixed top-12 left-0 w-full bg-white shadow-lg px-2 md:px-6 py-4 z-50 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img 
            src="/images/gift.jpg"
            alt="Ganza-Inema Fair Trade Logo" 
            className="h-10 w-10 md:h-12 md:w-12 object-contain"
          />
          <h1 className="text-orange-600 text-xl md:text-3xl font-bold tracking-tight">
            Ganza-Inema <span className="text-orange-800">Fair Trade</span>
          </h1>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-orange-600 text-3xl">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <ul
          className={`absolute md:static bg-white w-full md:w-auto left-0 top-20 md:top-0 md:flex space-x-6 text-gray-800 font-semibold transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}
        >
          {/* Home */}
          <li className="hover:bg-orange-100 px-4 py-2 rounded-lg transition duration-300">
            <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? "text-orange-600 font-bold" : "hover:text-orange-600"}>
              Home
            </NavLink>
          </li>
          {/* About Us Dropdown */}
          <li 
            className="relative hover:bg-orange-100 px-4 py-2 rounded-lg transition duration-300"
            onMouseEnter={() => setDropdown("about")}
            onMouseLeave={() => setDropdown(null)}
          >
            <NavLink to="" className="block">
              About Us
            </NavLink>
            {dropdown === "about" && (
              <ul className="absolute bg-white shadow-lg rounded-lg py-2 left-0 w-40 mt-1">
                <li>
                  <NavLink to="/Mission" onClick={closeMenu} className="block px-4 py-2 hover:bg-orange-200">
                    Mission
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Vision" onClick={closeMenu} className="block px-4 py-2 hover:bg-orange-200">
                    Vision
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          {/* Gallery Dropdown */}
          <li 
            className="relative hover:bg-orange-100 px-4 py-2 rounded-lg transition duration-300"
            onMouseEnter={() => setDropdown("gallery")}
            onMouseLeave={() => setDropdown(null)}
          >
            <NavLink to="" className="block">
              Gallery
            </NavLink>
            {dropdown === "gallery" && (
              <ul className="absolute bg-white shadow-lg rounded-lg py-2 left-0 w-40 mt-1">
                <li>
                  <NavLink to="/Videos" onClick={closeMenu} className="block px-4 py-2 hover:bg-orange-200">
                    Video
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Gallery" onClick={closeMenu} className="block px-4 py-2 hover:bg-orange-200">
                    Gallery Photo
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Other Links */}
          <li className="hover:bg-orange-100 px-4 py-2 rounded-lg transition duration-300">
            <NavLink to="/Events" onClick={closeMenu} className={({ isActive }) => isActive ? "text-orange-600 font-bold" : "hover:text-orange-600"}>
              Events
            </NavLink>
          </li>
          <li className="hover:bg-orange-100 px-4 py-2 rounded-lg transition duration-300">
            <NavLink to="/contactus" onClick={closeMenu} className={({ isActive }) => isActive ? "text-orange-600 font-bold" : "hover:text-orange-600"}>
              Contact Us
            </NavLink>
          </li>
          <li className="hover:bg-orange-100 px-4 py-2 rounded-lg transition duration-300">
            <NavLink to="/MoreBlogs" onClick={closeMenu} className={({ isActive }) => isActive ? "text-orange-600 font-bold" : "hover:text-orange-600"}>
              Blogs
            </NavLink>
          </li>
        </ul>

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
