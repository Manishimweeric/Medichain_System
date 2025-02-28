import React, { useState } from 'react';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', loginData);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden p-4">
      {/* Orange Decorative Curves */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-transparent border-t-4 border-l-4 border-orange-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-transparent border-b-4 border-r-4 border-orange-500 rounded-full translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-4xl bg-gray-800 rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-white mb-4">Welcome Back!</h1>

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-2">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-gray-700 text-white border-l-2 border-orange-500 p-3 rounded focus:outline-none"
                  required
                />
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-400 text-sm">Password</label>
                  <a href="#" className="text-orange-500 text-xs hover:underline">Forgot Password?</a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full bg-gray-700 text-white p-3 rounded focus:outline-none pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded transition duration-300"
              >
                Login
              </button>
            </form>
          )}
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block md:w-1/2 bg-center bg-cover" style={{ backgroundImage: "url('images/md3.jpg')" }}></div>
      </div>
    </div>
  );
};

export default AuthPage;
