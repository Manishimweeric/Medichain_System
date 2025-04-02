import React, { useEffect, useState } from "react";
import { fetchUsers, fetchOrders, fetchInventory } from '../../api';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard = () => {
  // State management
  const [loading, setLoading] = useState(true);
  const [supplierCount, setSupplierCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [ordersByStatus, setOrdersByStatus] = useState([]);
  const [monthlyOrderData, setMonthlyOrderData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topSuppliers, setTopSuppliers] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);

  // Constants
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF6B6B'];
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch all required data
        const [usersResult, ordersResult, inventoryResult] = await Promise.all([
          fetchUsers(),
          fetchOrders(),
          fetchInventory()
        ]);

        // Process users data
        const suppliers = usersResult.data.filter(user => user.role === "Supplier");
        setSupplierCount(suppliers.length);
        setUsersCount(usersResult.data.length);

        // Process orders data
        setOrdersCount(ordersResult.data.length);
        
        // Create orders by status chart data
        const statusCounts = {};
        ordersResult.data.forEach(order => {
          statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
        });
        
        const orderStatusData = Object.keys(statusCounts).map(status => ({
          name: status.charAt(0).toUpperCase() + status.slice(1),
          value: statusCounts[status]
        }));
        setOrdersByStatus(orderStatusData);
        
        // Calculate orders by month (using actual data)
        const ordersByMonth = Array(12).fill(0).map((_, i) => ({
          month: MONTHS[i],
          orders: 0
        }));
        
        ordersResult.data.forEach(order => {
          const orderDate = new Date(order.order_date);
          const monthIndex = orderDate.getMonth();
          ordersByMonth[monthIndex].orders += 1;
        });
        
        // Only include months that have data, up to the current month
        const currentMonth = new Date().getMonth();
        const filteredMonthlyData = ordersByMonth.slice(0, currentMonth + 1);
        setMonthlyOrderData(filteredMonthlyData);

        // Set recent orders (last 5)
        const sortedOrders = [...ordersResult.data].sort((a, b) => 
          new Date(b.order_date) - new Date(a.order_date)
        ).slice(0, 4);
        setRecentOrders(sortedOrders);

        // Process inventory data
        setInventoryCount(inventoryResult.data.length);
        
        // Count inventory items below reorder threshold
        const lowStock = inventoryResult.data.filter(
          item => item.quantity <= item.reorder_threshold
        );
        setLowStockCount(lowStock.length);

        // Create inventory data for visualization
        const inventoryChartData = inventoryResult.data
          .sort((a, b) => b.quantity - a.quantity)
          .slice(0, 8)
          .map(item => ({
            name: item.name.length > 15 ? item.name.substring(0, 15) + '...' : item.name,
            quantity: item.quantity,
            threshold: item.reorder_threshold
          }));
        setInventoryData(inventoryChartData);

        // Create top suppliers data based on number of orders
        const supplierOrders = {};
        ordersResult.data.forEach(order => {
          if (order.supplier) {
            supplierOrders[order.supplier] = (supplierOrders[order.supplier] || 0) + 1;
          }
        });
        
        // Map supplier IDs to names and get top 5
        const topSuppliersList = Object.entries(supplierOrders)
          .map(([supplierId, count]) => {
            const supplier = suppliers.find(s => s.id === parseInt(supplierId));
            return {
              id: supplierId,
              name: supplier ? supplier.name : `Supplier ${supplierId}`,
              orders: count
            };
          })
          .sort((a, b) => b.orders - a.orders)
          .slice(0, 4);
        
        setTopSuppliers(topSuppliersList);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Orders Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-500">Total Orders</h2>
            <span className="p-2 rounded-full bg-blue-50 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">{ordersCount}</span>
            {monthlyOrderData.length >= 2 && (
              <span className="ml-2 text-xs font-medium text-green-500">
                {(() => {
                  const currentMonth = monthlyOrderData[monthlyOrderData.length - 1];
                  const prevMonth = monthlyOrderData[monthlyOrderData.length - 2];
                  if (prevMonth.orders === 0) return "+100% from last month";
                  const percentChange = Math.round((currentMonth.orders - prevMonth.orders) / prevMonth.orders * 100);
                  return `${percentChange >= 0 ? '+' : ''}${percentChange}% from last month`;
                })()}
              </span>
            )}
          </div>
        </div>

        {/* Total Suppliers Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-500">Suppliers</h2>
            <span className="p-2 rounded-full bg-green-50 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">{supplierCount}</span>
            <span className="ml-2 text-xs font-medium text-green-500">Active suppliers</span>
          </div>
        </div>

        {/* Total Inventory Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-500">Inventory Items</h2>
            <span className="p-2 rounded-full bg-purple-50 text-purple-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">{inventoryCount}</span>
            <span className="ml-2 text-xs font-medium text-yellow-500">{lowStockCount} low stock</span>
          </div>
        </div>

        {/* Total Users Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-500">Total Users</h2>
            <span className="p-2 rounded-full bg-indigo-50 text-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">{usersCount}</span>
            <span className="ml-2 text-xs font-medium text-green-500">Active system users</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Orders Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium text-gray-800 mb-6">Monthly Orders</h2>
          {monthlyOrderData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyOrderData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="orders" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex justify-center items-center h-64 text-gray-400">
              No order data available for charting
            </div>
          )}
        </div>

        {/* Orders by Status Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium text-gray-800 mb-6">Orders by Status</h2>
          {ordersByStatus.length > 0 ? (
            <div className="flex justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={ordersByStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {ordersByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64 text-gray-400">
              No status data available for charting
            </div>
          )}
          <div className="flex flex-wrap justify-center mt-4">
            {ordersByStatus.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center mx-3 mb-2">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span className="text-sm text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory Status Chart */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-8">
        <h2 className="text-lg font-medium text-gray-800 mb-6">Inventory Status</h2>
        {inventoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inventoryData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#4F46E5" name="Current Quantity" />
              <Bar dataKey="threshold" fill="#EF4444" name="Reorder Threshold" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex justify-center items-center h-64 text-gray-400">
            No inventory data available for charting
          </div>
        )}
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Orders Table */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-800">Recent Orders</h2>
            <a href="/orders" className="text-sm text-blue-600 hover:text-blue-800">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.inventory_item ? (typeof order.inventory_item === 'object' ? order.inventory_item.name : order.inventory_item) : 'N/A'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                            order.status === 'canceled' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.order_date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-4 py-4 text-center text-sm text-gray-500">No orders found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Suppliers */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-800">Top Suppliers</h2>
            <a href="/suppliers" className="text-sm text-blue-600 hover:text-blue-800">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{supplier.orders}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => {
                            // Use supplier.id to generate a consistent rating
                            const rating = (parseInt(supplier.id) % 3) + 3; // Will give 3, 4, or 5 stars
                            return (
                              <svg 
                                key={i} 
                                className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            );
                          })}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                {topSuppliers.length === 0 && (
                  <tr>
                    <td colSpan="3" className="px-4 py-4 text-center text-sm text-gray-500">No suppliers found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Low Stock Alert */}
      {lowStockCount > 0 && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <span className="font-medium">Attention needed!</span> {lowStockCount} {lowStockCount === 1 ? 'item is' : 'items are'} below reorder threshold.
                <a href="/Procurement/getAllInventory" className="font-medium underline ml-1">View inventory</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;