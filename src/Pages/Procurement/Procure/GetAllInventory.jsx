import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search, AlertTriangle, Package, Filter, RefreshCw } from 'lucide-react';
import { fetchInventory } from '../../../api';

const InventoryList = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriteria, setFilterCriteria] = useState({
    lowStock: false,
    nearExpiration: false
  });
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  useEffect(() => {
    const loadInventoryItems = async () => {
      try {
        const response = await fetchInventory();
        if (response.data) {
          setInventoryItems(response.data);
        } else {
          showToast('error', response.message || 'Failed to fetch inventory items');
        }
        setLoading(false);
      } catch (error) {
        showToast('error', 'An unexpected error occurred while fetching inventory');
        setLoading(false);
      }
    };

    loadInventoryItems();
  }, []);

  const showToast = (type, message) => {
    // This would be implemented with your toast library
    console.log(`${type}: ${message}`);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? 
      <ChevronUp className="inline w-4 h-4" /> : 
      <ChevronDown className="inline w-4 h-4" />;
  };

  const filteredItems = inventoryItems
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.barcode?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const isLowStock = filterCriteria.lowStock ? item.quantity <= item.reorder_threshold : true;
      
      const isNearExpiration = filterCriteria.nearExpiration 
        ? (item.expiration_date && new Date(item.expiration_date) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000))
        : true;

      return matchesSearch && isLowStock && isNearExpiration;
    })
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <Package className="mr-2 text-blue-600" /> 
            Inventory Management
          </h1>
          
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* Search and Filter Bar */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input 
                  type="text"
                  placeholder="Search by name, description, or barcode..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-6 bg-white px-4 py-2 rounded-lg border border-gray-300">
                  <Filter className="text-gray-500 w-5 h-5" />
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={filterCriteria.lowStock}
                      onChange={() => setFilterCriteria(prev => ({
                        ...prev, 
                        lowStock: !prev.lowStock
                      }))}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Low Stock</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={filterCriteria.nearExpiration}
                      onChange={() => setFilterCriteria(prev => ({
                        ...prev, 
                        nearExpiration: !prev.nearExpiration
                      }))}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Near Expiration</span>
                  </label>
                </div>
                
                <button 
                  className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50"
                  onClick={() => {/* Refresh data */}}
                >
                  <RefreshCw className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            /* Inventory Table */
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th onClick={() => requestSort('id')} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                      <span className="flex items-center"># {getSortIcon('id')}</span>
                    </th>
                    <th onClick={() => requestSort('name')} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                      <span className="flex items-center">Name {getSortIcon('name')}</span>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th onClick={() => requestSort('quantity')} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                      <span className="flex items-center justify-center">Quantity {getSortIcon('quantity')}</span>
                    </th>
                    <th onClick={() => requestSort('reorder_threshold')} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                      <span className="flex items-center justify-center">Reorder Level {getSortIcon('reorder_threshold')}</span>
                    </th>
                    <th onClick={() => requestSort('WareHouse_details.name')} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                      <span className="flex items-center justify-center">Warehouse {getSortIcon('WareHouse_details.name')}</span>
                    </th>
                    <th onClick={() => requestSort('expiration_date')} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                      <span className="flex items-center justify-center">Expiration Date {getSortIcon('expiration_date')}</span>
                    </th>
                   
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => {
                      const isLowStock = item.quantity <= item.reorder_threshold;
                      return (
                        <tr key={item.id} className={`transition-colors ${isLowStock ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'}`}>
                          <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                            {index + 1}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{item.name}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {item.description || 'No description available'}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              isLowStock 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {isLowStock && <AlertTriangle className="mr-1 w-4 h-4" />}
                              {item.quantity}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {item.reorder_threshold}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {item.WareHouse_details.name}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            {item.expiration_date ? (
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                new Date(item.expiration_date) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                                  ? 'bg-orange-100 text-orange-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {new Date(item.expiration_date).toLocaleDateString()}
                              </span>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </td>
                          
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                        <div className="flex flex-col items-center justify-center">
                          <Package className="w-12 h-12 text-gray-300 mb-2" />
                          <p className="text-lg font-medium">No inventory items found</p>
                          <p className="text-sm">Try adjusting your search or filter criteria</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Table Footer with Stats */}
          {!loading && (
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
              <div className="flex gap-4 mb-4 sm:mb-0">
                <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-lg border border-gray-200">
                  Total Items: <strong>{filteredItems.length}</strong>
                </span>
                
                <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-lg border border-gray-200">
                  Low Stock: <strong className="text-red-600">{filteredItems.filter(i => i.quantity <= i.reorder_threshold).length}</strong>
                </span>
              </div>
              
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Items per page:</span>
                <select className="border border-gray-300 rounded-md text-sm p-1">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default InventoryList;