import React, { useState } from 'react';
import { loginUser }  from '../../api';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();   
    console.log(loginData); // Add this line
    
    if (!loginData.email || !loginData.password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
  
    const response = await loginUser(loginData);    
  
    if (response.data) {
      console.log(response.data.user.role);
  
      if (response.data.user.role) {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        toast.success('Login successful!');  
        switch (response.data.user.role) {
          case 'procurement':
            navigate('/Procurement/home');
            break;
          case 'warehouse':
            navigate('/warehouse-dashboard');
            break;
          case 'supplier':  
            navigate('/supplier-dashboard');
            break;
          default:
            toast.error('Unknown role, redirecting to default page.');
            navigate('/default-dashboard');
            break;
        }
      }
    } else {
      toast.info('Incorrect Email or Password!');
      console.log(response.message);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden p-4">
      <div className="absolute top-0 left-0 w-40 h-40 bg-transparent border-t-4 border-l-4 border-orange-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-transparent border-b-4 border-r-4 border-orange-500 rounded-full translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-5xl h-[70vh] bg-gray-800 rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row">
        <div className="hidden md:block md:w-1/2 bg-center bg-cover">
          <img src="images/md3.jpg" alt="Login visual" className="w-full h-full object-cover" />
        </div>

        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-white mb-4">Welcome Back!</h1>
          <p className="text-gray-400 mb-6">Sign in to access your account</p>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-2">Your Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-gray-700 text-white border-l-2 border-orange-500 p-3 pl-10 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-400 text-sm">Password</label>
                <a href="#" className="text-orange-500 text-xs hover:underline">Forgot Password?</a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full bg-gray-700 text-white p-3 pl-10 rounded focus:outline-none focus:ring-1 focus:ring-orange-500 pr-10"
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

            <div className="mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-orange-500 border-gray-600 rounded focus:ring-orange-500"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-400">
                  Remember me
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded transition duration-300 flex items-center justify-center"
            >
              <span>Login</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default LoginPage;