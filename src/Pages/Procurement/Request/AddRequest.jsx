import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { fetchInventory, createProcurementRequest } from '../../../api';

const ProcurementRequestForm = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [requestedQuantity, setRequestedQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadInventoryItems = async () => {
      try {
        const response = await fetchInventory();
        if (response.data) {
          setInventoryItems(response.data);
        } else {
          toast.error(response.message || 'Failed to fetch inventory items');
        }
      } catch (error) {
        toast.error('An unexpected error occurred while fetching inventory');
      }
    };

    loadInventoryItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedItem) {
      toast.error('Please select an inventory item');
      return;
    }

    const quantity = parseInt(requestedQuantity);
    if (isNaN(quantity) || quantity <= 0) {
      toast.error('Please enter a valid quantity');
      return;
    }

    setLoading(true);
    try {
      const response = await createProcurementRequest({
        inventory_item: selectedItem,
        requested_quantity: quantity
      });

      if (response.success) {
        toast.success('Procurement request submitted successfully');
        navigate('/procurement/Getrequest');
      } else {
        toast.error(response.message || 'Failed to submit procurement request');
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
          <h1 className="text-xl ">Procurement Request</h1>
          <Link 
            to="/Procurement/GetRequest" 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 inline-block"
          >
            Back to Procurement Request List
          </Link>
        </div>  
        
        <div className="max-w-3xl mx-auto bg-white p-8 shadow-xl rounded-lg border border-gray-100">    
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Create Procurement Request</h2>
            <p className="text-gray-600 mt-2">Add a new supplier to your inventory management system</p>
          </div>
        </div>
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-b-md overflow-hidden">       

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="inventory-item" className="block text-sm font-medium text-gray-700 mb-2">
                Inventory Item
              </label>
              <select
                id="inventory-item"
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select an item</option>
                {inventoryItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} (Current Stock: {item.quantity})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="requested-quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Requested Quantity
              </label>
              <input
                type="number"
                id="requested-quantity"
                value={requestedQuantity}
                onChange={(e) => setRequestedQuantity(e.target.value)}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/procurement/GetRequest')}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProcurementRequestForm;