import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { createWarehouse } from '../../../api';

const WareHouseForm = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter a warehouse name');
      return;
    }

    if (!location.trim()) {
      toast.error('Please enter a warehouse location');
      return;
    }
    const warehousedata = {
        name,
        location
      };
    

    setLoading(true);
    try {
      const response = await createWarehouse(warehousedata);

      if (response.success) {
    
        toast.success('Warehouse added successfully');
      } else {
        toast.error(response.message || 'Failed to add warehouse');
      } 
   
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="container flex justify-between items-center mb-6">
        <h1 className="text-xl">Warehouse Management</h1>
        <Link 
         to="/Procurement/Getwarehouse"  
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 inline-block"
        >
          Back to Warehouse List
        </Link>
      </div>  
      
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-xl rounded-lg border border-gray-100">    
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Create New Warehouse</h2>
          <p className="text-gray-600 mt-2">Add a new warehouse to your inventory management system</p>
        </div>
        </div>
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-b-md overflow-hidden">       
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="warehouse-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Warehouse Name
                </label>
                <input
                  type="text"
                  id="warehouse-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter warehouse name"
                  required
                />
              </div>

              <div>
                <label htmlFor="warehouse-location" className="block text-sm font-medium text-gray-700 mb-2">
                  Warehouse Location
                </label>
                <input
                  type="text"
                  id="warehouse-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter warehouse location"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/warehouse/list')}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Warehouse'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    
  );
};

export default WareHouseForm;