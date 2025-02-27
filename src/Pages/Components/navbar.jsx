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
      <div className="bg-green-800 text-white text-sm flex justify-between items-center px-6 py-3 fixed top-0 left-0 w-full z-50">
        <p>Improving Healthcare Supply Chains</p>
        <div className="hidden md:flex items-center space-x-4">
          <span>Email: medicare@example.com | Phone: +25012345678</span>
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
            src="/images/medlogo.png" // Update the image path
            alt="Medicain System Logo" 
            className="h-10 w-10 md:h-12 md:w-12 object-contain"
          />
          <h1 className="text-green-600 text-xl md:text-3xl font-bold tracking-tight">
            Medicain <span className="text-green-800">System</span>
          </h1>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-green-600 text-3xl">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <ul
          className={`absolute md:static bg-white w-full md:w-auto left-0 top-20 md:top-0 md:flex space-x-6 text-gray-800 font-semibold transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}
        >
          {/* Home */}
          <li className="hover:bg-green-100 px-4 py-2 rounded-lg transition duration-300">
            <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? "text-green-600 font-bold" : "hover:text-green-600"}>
              Home
            </NavLink>
          </li>

          {/* Features Dropdown */}
          <li 
            className="relative hover:bg-green-100 px-4 py-2 rounded-lg transition duration-300"
            onMouseEnter={() => setDropdown("features")}
            onMouseLeave={() => setDropdown(null)}
          >
            <NavLink to="" className="">
              Features
            </NavLink>
            
          </li>

          {/* Contact Us */}
          <li className="hover:bg-green-100 px-4 py-2 rounded-lg transition duration-300">
            <NavLink to="" onClick={closeMenu} className="">
              Contact Us
            </NavLink>
          </li>
          {/* Other Links */}
          <li className="hover:bg-green-100 px-4 py-2 rounded-lg transition duration-300">
            <NavLink to="" onClick={closeMenu} className="">
              About Us
            </NavLink>
          </li>

          {/* Login Link in Responsive View */}
          <li className="hover:bg-green-100 px-4 py-2 rounded-lg transition duration-300 md:hidden">
            <Link
              to="/login"
              className="flex items-center justify-center text-green-600"
              onClick={closeMenu}
            >
              <i className="fas fa-user mr-1"></i> {/* User Icon */}
              Login
            </Link>
          </li>
        </ul>

        <Link
          to="/login"
          className="hidden md:block bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300 flex items-center justify-center"
        >
          <i className="fas fa-user mr-1"></i> {/* User Icon */}
          Login
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
