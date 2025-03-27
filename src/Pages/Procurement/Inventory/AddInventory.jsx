import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerInventory } from '../../../api';

const InventoryRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: 0,
    reorder_threshold: 10,
    expiration_date: '',
    barcode: '',
    rfid_tag: ''
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
    const { name, quantity, reorder_threshold } = formData;
    if (!name) {
      toast.error('Item Name is required!');
      return;
    }

    if (quantity < 0) {
      toast.error('Quantity cannot be negative!');
      return;
    }

    setLoading(true);
    try {
      const { success, message } = await registerInventory(formData);
      toast.success('Inventory Item Registered Successfully');
      setFormData({
        name: '',
        description: '',
        quantity: 0,
        reorder_threshold: 10,
        expiration_date: '',
        barcode: '',
        rfid_tag: ''
      });
    } catch (error) {
      toast.error('An error occurred while registering the inventory item.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <Link 
          to="/procurement/GetInventory" 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 inline-block"
        >
          Back to Inventory List
        </Link>
      </div>
      
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-xl rounded-lg border border-gray-100">    
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Inventory Item Registration</h2>
          <p className="text-gray-600 mt-2">Add a new item to your inventory management system</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Item Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150"
                required
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150"
                required
              />
            </div>

            <div>
              <label htmlFor="reorder_threshold" className="block text-sm font-medium text-gray-700">
                Reorder Threshold
              </label>
              <input
                type="number"
                id="reorder_threshold"
                name="reorder_threshold"
                value={formData.reorder_threshold}
                onChange={handleChange}
                min="0"
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150"
              />
            </div>

            <div>
              <label htmlFor="expiration_date" className="block text-sm font-medium text-gray-700">
                Expiration Date
              </label>
              <input
                type="date"
                id="expiration_date"
                name="expiration_date"
                value={formData.expiration_date}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="barcode" className="block text-sm font-medium text-gray-700">
                Barcode
              </label>
              <input
                type="text"
                id="barcode"
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150"
              />
            </div>

            <div>
              <label htmlFor="rfid_tag" className="block text-sm font-medium text-gray-700">
                RFID Tag
              </label>
              <input
                type="text"
                id="rfid_tag"
                name="rfid_tag"
                value={formData.rfid_tag}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150"
              />
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
                'Register Inventory Item'
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

export default InventoryRegister;



