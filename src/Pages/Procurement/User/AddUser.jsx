import React, { useState } from 'react';
import { registerUser } from '../../../api';
import { Link } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'warehouse', 
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, role } = formData;

    // Simple validation
    if (!email || !password || !role) {
      toast.error('All fields are required!');
      return;
    }
    console.log('data:', JSON.stringify(formData));

    setLoading(true);
    try {
      const { success, message } = await registerUser(formData); 

      if (success) {
        toast.success(message);
        setFormData({
          email: '',
          password: '',
          role: 'warehouse',
        });
        
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error('An error occurred while registering the user.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Registration</h1>
        <Link
          to="/Procurement/GetUsers"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 inline-block"
        >
          Back to Users
        </Link>
      </div>
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-xl rounded-lg border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">User Registration</h2>
          <p className="text-gray-600 mt-2">Add a new user to your inventory management system</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-6 mt-5 ml-10">              
              <div>
                <input
                  type="radio"
                  id="procurement"
                  name="role"
                  value="procurement"
                  checked={formData.role === 'procurement'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="procurement" className="text-gray-700">Procurement Officer</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="warehouse"
                  name="role"
                  value="warehouse"
                  checked={formData.role === 'warehouse'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="warehouse" className="text-gray-700">Warehouse Manager</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="supplier"
                  name="role"
                  value="supplier"
                  checked={formData.role === 'supplier'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="supplier" className="text-gray-700">Supplier</label>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Register User'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Fields marked with <span className="text-red-500">*</span> are required</p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
