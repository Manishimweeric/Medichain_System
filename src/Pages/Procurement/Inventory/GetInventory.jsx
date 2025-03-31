import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchInventory,updateInventoryQuantity } from '../../../api';

const ReplenishmentModal = ({ item, onClose, onReplenish }) => {
    const [quantity, setQuantity] = useState(0);
  
    const handleReplenish = () => {
      if (quantity > 0) {
        onReplenish(item.id, quantity);
        onClose();
      } else {
        toast.error('Please enter a valid quantity');
      }
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 w-96">
          <h2 className="text-xl font-bold mb-4">Replenish {item.name}</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Current Quantity: {item.quantity}
            </label>
            <input 
              type="number" 
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter quantity to add"
              min="0"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button 
              onClick={handleReplenish}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Replenish
            </button>
          </div>
        </div>
      </div>
    );
  };


const InventoryList = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriteria, setFilterCriteria] = useState({
    lowStock: false,
    nearExpiration: false
  });
  const [selectedItemForReplenish, setSelectedItemForReplenish] = useState(null);

  // Fetch inventory items using the API function
  useEffect(() => {
    const loadInventoryItems = async () => {
      try {
        const response = await fetchInventory();
        
        if (response.data) {
          setInventoryItems(response.data);
        } else {
          toast.error(response.message || 'Failed to fetch inventory items');
        }
        
        setLoading(false);
      } catch (error) {
        toast.error('An unexpected error occurred while fetching inventory');
        setLoading(false);
      }
    };

    loadInventoryItems();
  }, []);

  // Handler for replenishing inventory
  const handleReplenish = async (itemId, quantityToAdd) => {
    try {
      const response = await updateInventoryQuantity(itemId, quantityToAdd);
      
      if (response.success) {
        // Update the local state
        setInventoryItems(prevItems => 
          prevItems.map(item => 
            item.id === itemId 
              ? { ...item, quantity: item.quantity + quantityToAdd } 
              : item
          )
        );
        toast.success(`Successfully added ${quantityToAdd} to ${response.itemName}`);
      } else {
        toast.error(response.message || 'Failed to update inventory');
      }
    } catch (error) {
      toast.error('An error occurred while updating inventory');
    }
  };

  // Filter and search logic (remains the same as previous implementation)
  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.barcode?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const isLowStock = filterCriteria.lowStock ? item.quantity <= item.reorder_threshold : true;
    
    const isNearExpiration = filterCriteria.nearExpiration 
      ? (item.expiration_date && new Date(item.expiration_date) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000))
      : true;

    return matchesSearch && isLowStock && isNearExpiration;
  });

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inventory item?')) {
      try {
        setInventoryItems(inventoryItems.filter(item => item.id !== id));
        toast.success('Inventory item deleted successfully');
      } catch (error) {
        toast.error('Failed to delete inventory item');
      }
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
        <Link 
          to="/procurement/addInventory" 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 inline-block"
        >
          + Add New Inventory Item
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center space-x-4">
          <div className="flex-grow">
            <input 
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox"
                checked={filterCriteria.lowStock}
                onChange={() => setFilterCriteria(prev => ({
                  ...prev, 
                  lowStock: !prev.lowStock
                }))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>Low Stock</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox"
                checked={filterCriteria.nearExpiration}
                onChange={() => setFilterCriteria(prev => ({
                  ...prev, 
                  nearExpiration: !prev.nearExpiration
                }))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>Near Expiration</span>
            </label>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th> 
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Reorder Threshold</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ware House</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Expiration Date</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Replenish</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.length > 0 ? (
                filteredItems.map((item,index) => (
                  <tr key={item.id} className={`
                    ${item.quantity <= item.reorder_threshold 
                      ? 'bg-red-50 hover:bg-red-100' 
                      : 'hover:bg-gray-50'}
                  `}>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                        <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {item.description ? (item.description.length > 20 ? item.description.slice(0, 10) + '...' : item.description) : 'N/A'}
                      </div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <span className={`
                        px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${item.quantity <= item.reorder_threshold 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-green-100 text-green-800'}
                      `}>
                        {item.quantity}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      {item.reorder_threshold}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      {item.WareHouse_details.name}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      {item.expiration_date || 'N/A'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                        <button 
                        onClick={() => setSelectedItemForReplenish(item)}
                        className="text-green-600 hover:text-green-900 "
                        >
                        Replenish
                        </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                    No inventory items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {!loading && (
          <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Total Items: {filteredItems.length}
            </span>
          </div>
        )}
      </div>
      {selectedItemForReplenish && (
        <ReplenishmentModal 
          item={selectedItemForReplenish}
          onClose={() => setSelectedItemForReplenish(null)}
          onReplenish={handleReplenish}
        />
      )}
    </div>
  );
};

export default InventoryList;