import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Search, Filter, X } from 'lucide-react';
import { fetchWarehouses, deleteWarehouse } from '../../../api';

const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const navigate = useNavigate();

  // Fetch warehouses on component mount
  useEffect(() => {
    loadWarehouses();
  }, []);

  // Function to load warehouses
  const loadWarehouses = async () => {
    try {
      setLoading(true);
      const response = await fetchWarehouses();
      
      if (response.success) {
        setWarehouses(response.data);
      } else {
        toast.error(response.message || 'Failed to load warehouses');
      }
    } catch (error) {
      toast.error('An unexpected error occurred while fetching warehouses');
    } finally {
      setLoading(false);
    }
  };

  // Handle warehouse deletion
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this warehouse?')) {
      return;
    }

    try {
      setDeleting(prev => ({ ...prev, [id]: true }));
      
      const response = await deleteWarehouse(id);
      
      if (response.success) {
        toast.success('Warehouse deleted successfully');
        loadWarehouses();
      } else {
        toast.error(response.message || 'Failed to delete warehouse');
      }
    } catch (error) {
      toast.error('An unexpected error occurred while deleting the warehouse');
    } finally {
      setDeleting(prev => ({ ...prev, [id]: false }));
    }
  };

  // Filtered and sorted warehouses
  const filteredAndSortedWarehouses = useMemo(() => {
    let result = warehouses;

    // Filter by search term
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(
        warehouse => 
          warehouse.name.toLowerCase().includes(lowercasedTerm) || 
          warehouse.location.toLowerCase().includes(lowercasedTerm)
      );
    }

    // Sort warehouses
    return result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [warehouses, searchTerm, sortConfig]);

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Render loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 rounded-full"></div>
          <p className="mt-4 text-gray-600">Loading warehouses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Warehouse Management</h1>
        <Link 
          to="/Procurement/addwarehouse" 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 inline-block"
        >
          + Add New Warehouse
        </Link>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 flex items-center space-x-4">
        <div className="relative flex-grow">
          <input 
            type="text"
            placeholder="Search warehouses by name or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {filteredAndSortedWarehouses.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <p className="text-gray-600 mb-4">
            {searchTerm 
              ? `No warehouses found matching "${searchTerm}"` 
              : 'No warehouses found'
            }
          </p>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th 
                  className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center">
                    ID 
                    {sortConfig.key === 'id' && (
                      <span className="ml-2">
                        {sortConfig.direction === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Name 
                    {sortConfig.key === 'name' && (
                      <span className="ml-2">
                        {sortConfig.direction === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort('location')}
                >
                  <div className="flex items-center">
                    Location 
                    {sortConfig.key === 'location' && (
                      <span className="ml-2">
                        {sortConfig.direction === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="p-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAndSortedWarehouses.map((warehouse) => (
                <tr key={warehouse.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="p-4 whitespace-nowrap text-sm text-gray-500">{warehouse.id}</td>
                  <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-900">{warehouse.name}</td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-500">{warehouse.location}</td>
                  <td className="p-4 whitespace-nowrap text-sm font-medium text-center">
                    <div className="flex justify-center space-x-2">
                
                      <button
                        onClick={() => handleDelete(warehouse.id)}
                        disabled={deleting[warehouse.id]}
                        className="flex items-center px-3 py-1 border border-red-600 text-red-600 rounded-md hover:bg-red-700 hover:text-black transition-colors"
                        >
                        {deleting[warehouse.id] ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Results Summary */}
          <div className="p-4 bg-gray-50 text-sm text-gray-600 border-t">
            Showing {filteredAndSortedWarehouses.length} of {warehouses.length} warehouses
          </div>
        </div>
      )}
    </div>
  );
};

export default WarehouseList;