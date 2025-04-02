import React, { useState,useEffect } from 'react';
import { getSupplierById, updateSupplier } from '../../../api';
import { Link,useNavigate,useParams  } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const StepNavigationForm = () => {
  const { id } = useParams(); 
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact_person: '',
    address: '',
    email: '',
    phone: '',
    role: '',
    rating: 0.0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchSupplierData = async () => {
      setLoading(true);
      try {
        const result = await  getSupplierById(id);
        if (result) {
          setFormData(result.data);
 
        } else {
          toast.error(message);
        }
      } catch (error) {
        toast.error('An error occurred while fetching the supplier data.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplierData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, address } = formData;

    // Simple validation
    if (!name || !email || !phone || !address) {
      toast.error('All fields marked with * are required!');
      return;
    }

    setLoading(true);
    try {
      const { success, message } = await updateSupplier(id, formData);

      if (success) {
        toast.success(message);

      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error('An error occurred while updating the supplier.');
        console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const goToNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      // Scroll to top when changing steps
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Scroll to top when changing steps
      window.scrollTo(0, 0);
    }
  };

  const isStepComplete = () => {
    if (currentStep === 1) {
      return formData.name && formData.address;
    }
    return true;
  };

  return (
    <div className="bg-gradient-to-br bg-white to-indigo-50 min-h-screen py-8">
      {/* Header with navigation */}
      <div className="container mx-auto px-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 rounded-lg p-2 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 text-transparent bg-clip-text">Edit User Management</h1>
          </div>
          <Link 
          to="/Procurement/GetSupplier" 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 inline-block"
        >
          Back to Suppliers
        </Link>
        </div>
      </div>
      
      {/* Form Container */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Form Header */}
        <div className="text-center mb-8 mt-5">
        <h2 className="text-3xl font-bold text-gray-800">Edit Supplier Details</h2>
        <p className="text-gray-600 mt-2">Update the supplier information</p>
        </div>
        
        <div className="p-8">
          {/* Progress Indicator */}
          
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 ${currentStep === 1 ? 'bg-blue-600 ring-4 ring-blue-200' : 'bg-blue-600'} rounded-full flex items-center justify-center text-white font-bold`}>1</div>
                <span className="text-xs font-medium text-gray-600 mt-1">Organization</span>
              </div>
              <div className="flex-1 flex items-center px-4">
                <div className={`h-1 w-full ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              </div>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 ${currentStep === 2 ? 'bg-blue-600 ring-4 ring-blue-200' : currentStep > 2 ? 'bg-blue-600' : 'bg-gray-300'} rounded-full flex items-center justify-center text-white font-bold`}>2</div>
                <span className="text-xs font-medium text-gray-600 mt-1">Contact</span>
              </div>
              <div className="flex-1 flex items-center px-4">
                <div className={`h-1 w-full ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              </div>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 ${currentStep === 3 ? 'bg-blue-600 ring-4 ring-blue-200' : currentStep > 3 ? 'bg-blue-600' : 'bg-gray-300'} rounded-full flex items-center justify-center text-white font-bold`}>3</div>
                <span className="text-xs font-medium text-gray-600 mt-1">Account</span>
              </div>
              <div className="flex-1 flex items-center px-4">
                <div className={`h-1 w-full ${currentStep >= 4 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              </div>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 ${currentStep === 4 ? 'bg-blue-600 ring-4 ring-blue-200' : 'bg-gray-300'} rounded-full flex items-center justify-center ${currentStep === 4 ? 'text-white' : 'text-gray-500'} font-bold`}>4</div>
                <span className="text-xs font-medium text-gray-600 mt-1">Evaluation</span>
              </div>
            </div>
          </div>

          {/* Step 1: Organization Info */}
          <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <div className="mb-8 bg-blue-50 p-6 rounded-lg shadow-inner">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 p-2 rounded-md mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2H4v-1h16v1h-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Organization Information</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact_person" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Person
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="contact_person"
                      name="contact_person"
                      value={formData.contact_person}
                      onChange={handleChange}
                      className="pl-10 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      className="pl-10 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact Info */}
          {currentStep === 2 && (
            <div className="mb-8 bg-indigo-50 p-6 rounded-lg shadow-inner">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-600 p-2 rounded-md mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Account Settings */}
          {currentStep === 3 && (
            <div className="mb-8 bg-purple-50 p-6 rounded-lg shadow-inner">
              <div className="flex items-center mb-4">
                <div className="bg-purple-600 p-2 rounded-md mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Account Settings</h3>
              </div>
              
              <div className="space-y-6">
               
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                    </div>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="pl-10 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white appearance-none"
                      required
                    >
                      <option value="">Select the Role</option>
                      <option value="procurement">Procurement Officer</option>
                      <option value="warehouse">Warehouse Manager</option>
                      <option value="supplier">Supplier</option>
                      <option value="healthcare">Health Care</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Evaluation */}
          {currentStep === 4 && (
            <div className="mb-8 bg-green-50 p-6 rounded-lg shadow-inner">
              <div className="flex items-center mb-4">
                <div className="bg-green-600 p-2 rounded-md mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Supplier Evaluation</h3>
              </div>
              
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                  Initial Rating
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="range"
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="block w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    min="0"
                    max="5"
                    step="0.1"
                  />
                  <span className="ml-3 text-gray-700 w-12 text-center">{Number(formData.rating).toFixed(1)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 px-1 mt-1">
                  <span>0</span>
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                </div>

                <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-2">Registration Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Supplier Name:</p>
                      <p className="font-medium">{formData.name || '-'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Contact Person:</p>
                      <p className="font-medium">{formData.contact_person || '-'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Email:</p>
                      <p className="font-medium">{formData.email || '-'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Phone:</p>
                      <p className="font-medium">{formData.phone || '-'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Role:</p>
                      <p className="font-medium">{formData.role || '-'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Rating:</p>
                      <p className="font-medium">{Number(formData.rating).toFixed(1)} / 5.0</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      </form>
          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={goToPreviousStep}
              className={`px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={currentStep === 1}
            >
              Previous Step
            </button>
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={goToNextStep}
                disabled={!isStepComplete()}
                className={`px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${!isStepComplete() ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Continue to {currentStep === 1 ? 'Contact Information' : currentStep === 2 ? 'Account Settings' : 'Evaluation'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Complete Registration
              </button>
            )}
            
          </div>
          
        </div>
      

        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center text-gray-500 text-sm">
          <p>Fields marked with <span className="text-red-500">*</span> are required</p>
          <p className="mt-1">Step {currentStep} of 4</p>
        </div>
        
      </div>
      </div>
    
  );
};

export default StepNavigationForm;