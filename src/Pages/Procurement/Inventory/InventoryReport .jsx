import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchInventory, fetchWarehouses } from '../../../api';
import { 
  Package, 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Printer, 
  Download, 
  Filter,
  RefreshCw
} from 'lucide-react';

const InventoryReport = () => {
  const [inventory, setInventory] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    warehouse: 'all',
    stockStatus: 'all',
    expirationStatus: 'all', 
  });
  const [reportDate] = useState(new Date());
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        

        const inventoryResponse = await fetchInventory();
        if (inventoryResponse.success) {
          setInventory(inventoryResponse.data || []);
        } else {
          toast.error(inventoryResponse.message || 'Failed to fetch inventory data');
        }
        
        const warehousesResponse = await fetchWarehouses();
        if (warehousesResponse.success) {
          setWarehouses(warehousesResponse.data || []);
        } else {
          toast.error(warehousesResponse.message || 'Failed to fetch warehouses data');
        }
        
        setLoading(false);
      } catch (error) {
        toast.error('An unexpected error occurred');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const filteredInventory = inventory.filter(item => {
    if (filters.warehouse !== 'all' && item.WareHouse.toString() !== filters.warehouse) {
      return false;
    }
    
    if (filters.stockStatus === 'low' && item.quantity > item.reorder_threshold) {
      return false;
    } else if (filters.stockStatus === 'out' && item.quantity > 0) {
      return false;
    } else if (filters.stockStatus === 'normal' && (item.quantity <= item.reorder_threshold || item.quantity === 0)) {
      return false;
    }
    
    const today = new Date();
    if (item.expiration_date) {
      const expirationDate = new Date(item.expiration_date);
      const daysUntilExpiration = Math.floor((expirationDate - today) / (1000 * 60 * 60 * 24));
      
      if (filters.expirationStatus === 'expired' && daysUntilExpiration >= 0) {
        return false;
      } else if (filters.expirationStatus === 'expiring' && (daysUntilExpiration < 0 || daysUntilExpiration > 30)) {
        return false;
      } else if (filters.expirationStatus === 'valid' && daysUntilExpiration <= 30) {
        return false;
      }
    } else if (filters.expirationStatus !== 'all' && filters.expirationStatus !== 'valid') {
      return false;
    }
    
    return true;
  });

  const calculateSummary = () => {
    if (inventory.length === 0) {
      return {
        totalItems: 0,
        totalQuantity: 0,
        lowStockItems: 0,
        outOfStockItems: 0,
        expiringItems: 0,
        expiredItems: 0,
        averageStockLevel: 0,
        highestStockItem: null,
        lowestStockItem: null
      };
    }
    
    const today = new Date();
    let lowStockItems = 0;
    let outOfStockItems = 0;
    let expiringItems = 0;
    let expiredItems = 0;
    let totalQuantity = 0;
    
    let highestStockItem = inventory[0];
    let lowestStockItem = inventory[0];
    
    inventory.forEach(item => {
      totalQuantity += item.quantity;
      
      if (item.quantity === 0) {
        outOfStockItems++;
      } else if (item.quantity <= item.reorder_threshold) {
        lowStockItems++;
      }
      
      if (item.expiration_date) {
        const expirationDate = new Date(item.expiration_date);
        const daysUntilExpiration = Math.floor((expirationDate - today) / (1000 * 60 * 60 * 24));
        
        if (daysUntilExpiration < 0) {
          expiredItems++;
        } else if (daysUntilExpiration <= 30) {
          expiringItems++;
        }
      }
      
      if (item.quantity > highestStockItem.quantity) {
        highestStockItem = item;
      }
      if (item.quantity < lowestStockItem.quantity) {
        lowestStockItem = item;
      }
    });
    
    return {
      totalItems: inventory.length,
      totalQuantity,
      lowStockItems,
      outOfStockItems,
      expiringItems,
      expiredItems,
      averageStockLevel: Math.round(totalQuantity / inventory.length),
      highestStockItem,
      lowestStockItem
    };
  };

  const summary = calculateSummary();

  // Group items by warehouse
  const getItemsByWarehouse = () => {
    const warehouseItems = {};
    
    warehouses.forEach(warehouse => {
      warehouseItems[warehouse.id] = {
        warehouseInfo: warehouse,
        items: [],
        totalQuantity: 0,
        lowStockItems: 0,
        outOfStockItems: 0
      };
    });
    
    filteredInventory.forEach(item => {
      const warehouseId = item.WareHouse_details?.id || item.WareHouse_details;
      
      if (warehouseItems[warehouseId]) {
        warehouseItems[warehouseId].items.push(item);
        warehouseItems[warehouseId].totalQuantity += item.quantity;
        
        if (item.quantity === 0) {
          warehouseItems[warehouseId].outOfStockItems++;
        } else if (item.quantity <= item.reorder_threshold) {
          warehouseItems[warehouseId].lowStockItems++;
        }
      }
    });
    
    return Object.values(warehouseItems);
  };

  const warehouseData = getItemsByWarehouse();
  
  const sortedByQuantity = [...filteredInventory].sort((a, b) => b.quantity - a.quantity);
  
  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Description', 'Quantity', 'Reorder Threshold', 'Warehouse', 'Expiration Date', 'Barcode', 'RFID Tag', 'Last Updated'];
    
    const csvData = filteredInventory.map(item => [
      item.name,
      item.description || '',
      item.quantity,
      item.reorder_threshold,
      warehouses.find(w => w.id === item.WareHouse)?.name || '',
      item.expiration_date || '',
      item.barcode || '',
      item.rfid_tag || '',
      new Date(item.last_updated).toLocaleString()
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `inventory_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-8xl">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 print:shadow-none">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Inventory Report</h1>
            <p className="text-gray-600">
              Generated on: {reportDate.toLocaleDateString()} at {reportDate.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </button>
            <button
              onClick={() => setIsFilterVisible(!isFilterVisible)}
              className="flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Filters Section */}
        {isFilterVisible && (
          <div className="bg-gray-50 p-4 rounded-md mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 print:hidden">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Warehouse</label>
              <select
                value={filters.warehouse}
                onChange={(e) => setFilters({...filters, warehouse: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Warehouses</option>
                {warehouses.map(warehouse => (
                  <option key={warehouse.id} value={warehouse.id.toString()}>
                    {warehouse.name} - {warehouse.location}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
              <select
                value={filters.stockStatus}
                onChange={(e) => setFilters({...filters, stockStatus: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Stock Levels</option>
                <option value="normal">Normal Stock</option>
                <option value="low">Low Stock</option>
                <option value="out">Out of Stock</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Status</label>
              <select
                value={filters.expirationStatus}
                onChange={(e) => setFilters({...filters, expirationStatus: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Expiration Status</option>
                <option value="valid">Valid (30 days)</option>
                <option value="expiring">Expiring Soon (≤ 30 days)</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center mb-2">
              <Package className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="font-semibold text-blue-800">Total Inventory</h3>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold text-blue-700">{summary.totalItems}</p>
              <p className="text-sm text-blue-600">Items</p>
            </div>
            <p className="text-sm text-blue-600 mt-1">Total Quantity: {summary.totalQuantity}</p>
          </div>
          
          <div className="bg-red-50 rounded-lg p-4 border border-red-100">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              <h3 className="font-semibold text-red-800">Stock Alerts</h3>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold text-red-700">{summary.lowStockItems}</p>
              <p className="text-sm text-red-600">Low Stock</p>
            </div>
            <p className="text-sm text-red-600 mt-1">Out of Stock: {summary.outOfStockItems}</p>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 text-yellow-600 mr-2" />
              <h3 className="font-semibold text-yellow-800">Expiration Alerts</h3>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold text-yellow-700">{summary.expiringItems}</p>
              <p className="text-sm text-yellow-600">Expiring Soon</p>
            </div>
            <p className="text-sm text-yellow-600 mt-1">Expired: {summary.expiredItems}</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="font-semibold text-green-800">Stock Levels</h3>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold text-green-700">{summary.averageStockLevel}</p>
              <p className="text-sm text-green-600">Avg. Quantity</p>
            </div>
            <p className="text-sm text-green-600 mt-1">Total Warehouses: {warehouses.length}</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
          <span className="ml-2 text-gray-600">Loading inventory data...</span>
        </div>
      ) : (
        <>
          {/* Warehouse Breakdown */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6 print:shadow-none">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Warehouse Breakdown</h2>
            </div>
            <div className="p-6">
              {warehouseData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {warehouseData.map((warehouse, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <div className="px-4 py-3 bg-indigo-50 border-b">
                        <h3 className="font-medium text-indigo-800">
                          {warehouse.warehouseInfo.name} - {warehouse.warehouseInfo.location}
                        </h3>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <div className="bg-gray-50 p-2 rounded text-center">
                            <div className="text-sm text-gray-500">Items</div>
                            <div className="font-bold text-gray-800">{warehouse.items.length}</div>
                          </div>
                          <div className="bg-gray-50 p-2 rounded text-center">
                            <div className="text-sm text-gray-500">Quantity</div>
                            <div className="font-bold text-gray-800">{warehouse.totalQuantity}</div>
                          </div>
                          <div className="bg-gray-50 p-2 rounded text-center">
                            <div className="text-sm text-gray-500">Low Stock</div>
                            <div className="font-bold text-red-600">{warehouse.lowStockItems}</div>
                          </div>
                        </div>
                        
                        {warehouse.items.length > 0 ? (
                          <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead>
                              <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Qty</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {warehouse.items.slice(0, 5).map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                  <td className="px-3 py-2 whitespace-nowrap text-gray-800">{item.name}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-center">{item.quantity}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-center">
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                      item.quantity === 0 
                                        ? 'bg-red-100 text-red-800' 
                                        : item.quantity <= item.reorder_threshold 
                                          ? 'bg-yellow-100 text-yellow-800' 
                                          : 'bg-green-100 text-green-800'
                                    }`}>
                                      {item.quantity === 0 
                                        ? 'Out' 
                                        : item.quantity <= item.reorder_threshold 
                                          ? 'Low' 
                                          : 'OK'}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <p className="text-gray-500 text-center py-2">No items in this warehouse</p>
                        )}
                        
                        {warehouse.items.length > 5 && (
                          <div className="mt-2 text-right">
                            <span className="text-sm text-gray-500">
                              +{warehouse.items.length - 5} more items
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No warehouse data available</p>
              )}
            </div>
          </div>

          {/* Detailed Inventory Table */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6 print:shadow-none">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Detailed Inventory Report</h2>
              <p className="text-sm text-gray-600 mt-1">
                Showing {filteredInventory.length} of {inventory.length} items
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Details
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reorder Level
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Warehouse
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expiration
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInventory.length > 0 ? (
                    filteredInventory.map((item) => {
                      // Calculate expiration status
                      let expirationStatus = '';
                      let expirationClass = '';
                      
                      if (item.expiration_date) {
                        const expirationDate = new Date(item.expiration_date);
                        const today = new Date();
                        const daysUntilExpiration = Math.floor((expirationDate - today) / (1000 * 60 * 60 * 24));
                        
                        if (daysUntilExpiration < 0) {
                          expirationStatus = 'Expired';
                          expirationClass = 'bg-red-100 text-red-800';
                        } else if (daysUntilExpiration <= 30) {
                          expirationStatus = `Expires in ${daysUntilExpiration} days`;
                          expirationClass = 'bg-yellow-100 text-yellow-800';
                        } else {
                          expirationStatus = `Expires in ${daysUntilExpiration} days`;
                          expirationClass = 'bg-green-100 text-green-800';
                        }
                      } else {
                        expirationStatus = 'N/A';
                        expirationClass = 'bg-gray-100 text-gray-800';
                      }
                      
                      return (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                <Package className="h-5 w-5 text-indigo-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                <div className="text-sm text-gray-500">
                                  {item.description ? (item.description.length > 50 ? item.description.slice(0, 50) + '...' : item.description) : 'No description'}
                                </div>
                                {item.barcode && (
                                  <div className="text-xs text-gray-400 mt-1">
                                    Barcode: {item.barcode}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                              item.quantity === 0 
                                ? 'bg-red-100 text-red-800' 
                                : item.quantity <= item.reorder_threshold 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : 'bg-green-100 text-green-800'
                            }`}>
                              {item.quantity}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {item.reorder_threshold}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm text-gray-900">
                              {item.WareHouse_details.name || 'Unknown'}
                            </div>
                            <div className="text-xs text-gray-500">
                              {warehouses.find(w => w.id === item.WareHouse)?.location || ''}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className={`px-2 py-1 text-xs rounded-full ${expirationClass}`}>
                              {expirationStatus}
                            </span>
                            {item.expiration_date && (
                              <div className="text-xs text-gray-500 mt-1">
                                {new Date(item.expiration_date).toLocaleDateString()}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {new Date(item.last_updated).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        No inventory items match the selected filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      </div>
     );
};

export default InventoryReport;