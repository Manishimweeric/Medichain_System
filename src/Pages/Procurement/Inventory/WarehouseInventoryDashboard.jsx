import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchWarehouses, fetchInventory } from '../../../api';
import { Package, Home, AlertTriangle, AlertCircle, BarChart3, PieChart } from 'lucide-react';

const WarehouseInventoryDashboard = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fetch warehouses
        const warehousesResponse = await fetchWarehouses();
        if (warehousesResponse.success) {
          setWarehouses(warehousesResponse.data);
        } else {
          toast.error(warehousesResponse.message || 'Failed to fetch warehouses');
        }
        
        // Fetch inventory
        const inventoryResponse = await fetchInventory();
        if (inventoryResponse.success) {
          setInventory(inventoryResponse.data);
        } else {
          toast.error(inventoryResponse.message || 'Failed to fetch inventory');
        }
        
        setLoading(false);
      } catch (error) {
        toast.error('An unexpected error occurred while fetching data');
        setLoading(false);
      }
    };

    loadData();
  }, []);

// Filter inventory by selected warehouse
const filteredInventory = selectedWarehouse === 'all' 
  ? inventory 
  : inventory.filter(item => {
      const warehouseId = item.WareHouse_details?.id || item.WareHouse_details;
      return warehouseId.toString() === selectedWarehouse;
  });

  // Calculate statistics
  const calculateStatistics = () => {
    if (filteredInventory.length === 0) return {
      totalItems: 0,
      lowStockItems: 0,
      expiringItems: 0,
      totalQuantity: 0,
      averageQuantity: 0
    };

    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    
    const lowStockItems = filteredInventory.filter(item => item.quantity <= item.reorder_threshold).length;
    const expiringItems = filteredInventory.filter(item => 
      item.expiration_date && new Date(item.expiration_date) <= thirtyDaysFromNow
    ).length;
    const totalQuantity = filteredInventory.reduce((sum, item) => sum + item.quantity, 0);
    
    return {
      totalItems: filteredInventory.length,
      lowStockItems,
      expiringItems,
      totalQuantity,
      averageQuantity: filteredInventory.length > 0 ? Math.round(totalQuantity / filteredInventory.length) : 0
    };
  };

  const stats = calculateStatistics();
  const getInventoryByWarehouse = () => {
    const warehouseInventory = {};
    
    warehouses.forEach(warehouse => {
      warehouseInventory[warehouse.id] = {
        name: warehouse.name,
        itemCount: 0,
        totalQuantity: 0,
        lowStock: 0
      };
    });    
    inventory.forEach(item => {
        const warehouseId = item.WareHouse_details?.id || item.WareHouse_details;
      if (warehouseId && warehouseInventory[warehouseId]) {
        warehouseInventory[warehouseId].itemCount += 1;
        warehouseInventory[warehouseId].totalQuantity += item.quantity;

        if (item.quantity <= item.reorder_threshold) {
          warehouseInventory[warehouseId].lowStock += 1;
        }
      }
    });
    
    return Object.values(warehouseInventory);
  };

  const warehouseData = getInventoryByWarehouse();

  // Get top inventory items
  const getTopInventoryItems = () => {
    return [...filteredInventory]
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 3);
  };

  const topItems = getTopInventoryItems();
  // Get low stock items
  const getLowStockItems = () => {
    return filteredInventory
      .filter(item => item.quantity <= item.reorder_threshold)
      .slice(0, 5);
  };

  const lowStockItems = getLowStockItems();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Warehouse Inventory Dashboard</h1>
        <p className="text-gray-600">Overview of your warehouse inventory status</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : (
        <>
          {/* Warehouse Selector */}
          <div className="mb-6">
            <div className="flex items-center">
              <label htmlFor="warehouse-select" className="mr-2 font-medium text-gray-700">Select Warehouse:</label>
              <select
                id="warehouse-select"
                value={selectedWarehouse}
                onChange={(e) => setSelectedWarehouse(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Warehouses</option>
                {warehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id.toString()}>
                    {warehouse.name} - {warehouse.location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Items</p>
                <h3 className="text-2xl font-bold text-gray-800">{stats.totalItems}</h3>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Quantity</p>
                <h3 className="text-2xl font-bold text-gray-800">{stats.totalQuantity}</h3>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <PieChart className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Quantity</p>
                <h3 className="text-2xl font-bold text-gray-800">{stats.averageQuantity}</h3>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="rounded-full bg-yellow-100 p-3 mr-4">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Low Stock Items</p>
                <h3 className="text-2xl font-bold text-gray-800">{stats.lowStockItems}</h3>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="rounded-full bg-red-100 p-3 mr-4">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Expiring Soon</p>
                <h3 className="text-2xl font-bold text-gray-800">{stats.expiringItems}</h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Warehouse Summary */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">Warehouse Summary</h3>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Low Stock</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {warehouseData.map((warehouse, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                <Home className="h-4 w-4 text-indigo-600" />
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{warehouse.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-500">
                            {warehouse.itemCount}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-500">
                            {warehouse.totalQuantity}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              warehouse.lowStock > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {warehouse.lowStock}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Top Inventory Items */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">Top Inventory Items</h3>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {topItems.length > 0 ? (
                        topItems.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <Package className="h-4 w-4 text-blue-600" />
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-center">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {item.quantity}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-500">
                              {item.WareHouse_details?.name || 'N/A'}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="px-4 py-3 text-center text-sm text-gray-500">
                            No items found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Alert Section */}
          <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
            <div className="px-6 py-4 bg-red-50 border-b border-red-200">
              <h3 className="text-lg font-medium text-red-800 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Low Stock Alert
              </h3>
            </div>
            <div className="p-6">
              {lowStockItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lowStockItems.map((item) => (
                    <div key={item.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-red-800">{item.name}</h4>
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          {item.quantity} / {item.reorder_threshold}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.description ? (item.description.length > 50 ? item.description.slice(0, 50) + '...' : item.description) : 'No description'}
                      </p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Warehouse: {item.WareHouse_details?.name || 'N/A'}</span>
                        <span>Last Updated: {new Date(item.last_updated).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No low stock items found
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity (Placeholder - would require activity tracking in your backend) */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">Inventory updated</div>
                    <div className="text-sm text-gray-500">
                      Last inventory update: {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Home className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">Warehouses loaded</div>
                    <div className="text-sm text-gray-500">
                      {warehouses.length} warehouses in the system
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WarehouseInventoryDashboard;