import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerInventory, fetchWarehouses } from '../../../api';

import { 
  Package2Icon, 
  ArrowLeftIcon, 
  WarehouseIcon, 
  InfoIcon, 
  CalendarIcon, 
  AlertCircleIcon,
  CheckCircleIcon
} from 'lucide-react';
const InventoryRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: 0,
    reorder_threshold: 10,
    expiration_date: '',
    barcode: '',
    rfid_tag: '',
    WareHouse: ''
  });

  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [warehousesLoading, setWarehousesLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Fetch warehouses on component mount
  useEffect(() => {
    const loadWarehouses = async () => {
      try {
        setWarehousesLoading(true);
        const response = await fetchWarehouses();
        
        if (response.success) {
          setWarehouses(response.data);
          if (response.data.length === 1) {
            setFormData(prev => ({
              ...prev,
              WareHouse: response.data[0].id
            }));
          }
        } else {
          toast.error(response.message || 'Failed to load warehouses');
        }
      } catch (error) {
        toast.error('An error occurred while fetching warehouses');
      } finally {
        setWarehousesLoading(false);
      }
    };

    loadWarehouses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, quantity, WareHouse } = formData;

    if (!name) {
      toast.error('Item Name is required!');
      return;
    }

    if (quantity < 0) {
      toast.error('Quantity cannot be negative!');
      return;
    }

    if (!WareHouse) {
      toast.error('Please select a warehouse!');
      return;
    }

    setLoading(true);
    try {
      const { success, message } = await registerInventory(formData);
      
      if (success) {
        toast.success('Inventory Item Registered Successfully');
        setFormSubmitted(true);
        // Reset form
        setTimeout(() => {
          setFormData({
            name: '',
            description: '',
            quantity: 0,
            reorder_threshold: 10,
            expiration_date: '',
            barcode: '',
            rfid_tag: '',
            WareHouse: warehouses.length === 1 ? warehouses[0].id : ''
          });
          setFormSubmitted(false);
        }, 3000);
      } else {
        toast.error(message || 'Failed to register inventory item');
      }
    } catch (error) {
      toast.error('An error occurred while registering the inventory item.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-8xl mx-auto">
        {/* Header with navigation */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <Package2Icon className="mr-2 text-indigo-600" size={24} />
            Inventory Management
          </h1>
          <Link 
            to="/procurement/GetInventory" 
            className="flex items-center px-4 py-2 text-indigo-600 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Inventory List
          </Link>
        </div>
        </div>
        <div className="max-w-4xl mx-auto"> 
        {formSubmitted ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
              <CheckCircleIcon className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-6">The inventory item has been added to your system.</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setFormSubmitted(false)}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Add Another Item
              </button>
              <Link 
                to="/procurement/GetInventory" 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                View Inventory List
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Form Header */}
            <div className="bg-indigo-600 px-6 py-4 border-b">
              <h2 className="text-xl font-bold text-white">Inventory Item Registration</h2>
              <p className="text-indigo-100 text-sm mt-1">Add a new item to your inventory management system</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              {/* Basic Information Section */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <InfoIcon className="w-5 h-5 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-medium text-gray-800">Basic Information</h3>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Item Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        min="0"
                        className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="reorder_threshold" className="block text-sm font-medium text-gray-700 mb-1">
                        Reorder Threshold
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          id="reorder_threshold"
                          name="reorder_threshold"
                          value={formData.reorder_threshold}
                          onChange={handleChange}
                          min="0"
                          className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            Units
                          </div>
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Minimum quantity before reordering</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Location Section */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <WarehouseIcon className="w-5 h-5 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-medium text-gray-800">Storage Location</h3>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div>
                    <label htmlFor="warehouse" className="block text-sm font-medium text-gray-700 mb-1">
                      Warehouse <span className="text-red-500">*</span>
                    </label>
                    {warehousesLoading ? (
                      <div className="flex items-center px-4 py-2 text-gray-500">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500 mr-2"></div>
                        Loading warehouses...
                      </div>
                    ) : warehouses.length === 0 ? (
                      <div className="flex items-center px-4 py-2 bg-red-50 text-red-700 rounded-md border border-red-200">
                        <AlertCircleIcon className="w-5 h-5 mr-2" />
                        No warehouses available. Please create a warehouse first.
                      </div>
                    ) : (
                      <select
                        id="WareHouse"
                        name="WareHouse"
                        value={formData.WareHouse}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                      >
                        <option value="">Select a Warehouse</option>
                        {warehouses.map((warehouse) => (
                          <option key={warehouse.id} value={warehouse.id}>
                            {warehouse.name} - {warehouse.location}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Additional Details Section */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  
                  <h3 className="text-lg font-medium text-gray-800">Tracking Information</h3>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="barcode" className="block text-sm font-medium text-gray-700 mb-1">
                        Barcode
                      </label>
                      <input
                        type="text"
                        id="barcode"
                        name="barcode"
                        value={formData.barcode}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Enter barcode identifier"
                      />
                    </div>
                    <div>
                      <label htmlFor="rfid_tag" className="block text-sm font-medium text-gray-700 mb-1">
                        RFID Tag
                      </label>
                      <input
                        type="text"
                        id="rfid_tag"
                        name="rfid_tag"
                        value={formData.rfid_tag}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Enter RFID tag number"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Timing Section */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <CalendarIcon className="w-5 h-5 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-medium text-gray-800">Timing Information</h3>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div>
                    <label htmlFor="expiration_date" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiration Date
                    </label>
                    <input
                      type="date"
                      id="expiration_date"
                      name="expiration_date"
                      value={formData.expiration_date}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <p className="mt-1 text-xs text-gray-500">Leave blank if item does not expire</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <p className="mb-4 sm:mb-0 text-sm text-gray-500">
                    <span className="text-red-500">*</span> Required fields
                  </p>
                  <button
                    type="submit"
                    disabled={loading || warehousesLoading || warehouses.length === 0}
                    className={`flex justify-center items-center py-2 px-6 rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${(loading || warehousesLoading || warehouses.length === 0) ? 'opacity-70 cursor-not-allowed' : ''}`}
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
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryRegister;