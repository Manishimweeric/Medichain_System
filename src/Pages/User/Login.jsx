import React, { useState } from 'react';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [registrationData, setRegistrationData] = useState({
    fullName: '',
    email: '',
    password:''
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', activeTab === 'login' ? loginData : registrationData);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden mt-19">
      {/* Orange decorative curves */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-transparent border-t-4 border-l-4 border-orange-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-transparent border-b-4 border-r-4 border-orange-500 rounded-full translate-x-1/2 translate-y-1/2"></div>
      
      <div className="w-full max-w-6xl bg-gray-900 rounded-lg overflow-hidden shadow-2xl flex">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
          {/* Top navigation */}
          <div className="mb-12">
            <div className="flex space-x-6 text-gray-300 text-sm">
              <button 
                onClick={() => setActiveTab('login')}
                className={`py-2 ${activeTab === 'login' ? 'text-orange-500 border-b-2 border-orange-500' : ''}`}
              >
                Login
              </button>
              <button 
                onClick={() => setActiveTab('registration')}
                className={`py-2 ${activeTab === 'registration' ? 'text-orange-500 border-b-2 border-orange-500' : ''}`}
              >
                Registration
              </button>
            </div>
          </div>
          
          {/* Form content */}
          <div className="flex-grow">
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-white mb-2">
                {activeTab === 'login' ? 'Welcome Back!' : 'Good Morning!'}
              </h1>
              <p className="text-gray-400">
                {activeTab === 'login' ? 'Please login to continue' : 'Thank you for joining us!'}
              </p>
            </div>
            
            {activeTab === 'login' ? (
              // Login Form
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-400 text-sm mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="Enter your email"
                    className="w-full bg-gray-800 text-white border-l-2 border-orange-500 p-3 rounded focus:outline-none"
                    required
                  />
                </div>
                
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-gray-400 text-sm">Password</label>
                    <a href="#" className="text-orange-500 text-xs hover:underline">Forgot Password?</a>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      placeholder="Enter your password"
                      className="w-full bg-gray-800 text-white p-3 rounded focus:outline-none pr-10"
                      required
                    />
                    <button 
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPassword ? 
                          "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" : 
                          "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                      </svg>
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
            ) : (
              // Registration Form
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      value={registrationData.fullName}
                      onChange={handleRegistrationChange}
                      className="w-full bg-gray-800 text-white border-l-2 border-orange-500 p-3 rounded focus:outline-none"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-400 text-sm mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={registrationData.email}
                    onChange={handleRegistrationChange}
                    className="w-full bg-gray-800 text-white p-3 rounded focus:outline-none"
                    required
                  />
                </div>
                
                <div className="mb-8">
                  <label className="block text-gray-400 text-sm mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={registrationData.password}
                      onChange={handleRegistrationChange}
                      className="w-full bg-gray-800 text-white p-3 rounded focus:outline-none pr-10"
                      required
                    />
                    <button 
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPassword ? 
                          "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" : 
                          "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded transition duration-300"
                >
                  Register
                </button>
              </form>
            )}
          </div>
          
          {/* Footer with logo */}
          <div className="mt-12">
            <div className="flex items-center">
              <svg className="h-6 w-6 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="ml-2 text-xl font-medium text-white">FutureFlux</span>
            </div>
          </div>
        </div>
        
        {/* Right side - Image */}
        <div className="hidden md:block md:w-1/2 bg-center bg-cover" style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1267&q=80')"
        }}>
          {/* This is just a container for the background image */}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;