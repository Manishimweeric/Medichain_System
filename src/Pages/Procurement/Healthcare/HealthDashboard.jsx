import React, { useEffect, useState } from "react";
import { fetchOrders } from '../../../api';
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
  Cell,
  AreaChart,
  Area
} from 'recharts';

const HealthDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('month');

  const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
  
  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem('user_id');
        const ordersResponse = await fetchOrders();
        
        // Handle the specific response format you mentioned
        if (ordersResponse.data) {
            const approvedOrders = ordersResponse.data.filter(
                order => (order.Send_by == userId)
              );
          setOrders(Array.isArray(approvedOrders) ? approvedOrders : []);
        } else if (Array.isArray(approvedOrders)) {
          setOrders(approvedOrders);
        } else if (approvedOrders && typeof approvedOrders === 'object' && approvedOrders.results) {
          // Also handle { results: [...] } format
          setOrders(Array.isArray(approvedOrders.results) ? approvedOrders.results : []);
        } else {
          console.error('Invalid data format from API:', approvedOrders);
          setOrders([]);
          setError('Invalid data format received');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders');
        setOrders([]);
        setLoading(false);
      }
    };
    
    loadOrders();
  }, []);

  // Safely check if orders is an array before using array methods
  const safeOrders = Array.isArray(orders) ? orders : [];

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading dashboard data...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md m-6">
      <div className="flex items-center">
        <div className="text-red-500 font-bold text-xl mr-3">⚠️</div>
        <div>
          <p className="text-red-800 font-medium">Error Loading Dashboard</p>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    </div>
  );
  
  // Process data for status distribution
  const getStatusData = () => {
    const statusCount = {};
    safeOrders.forEach(order => {
      if (!order) return;
      const status = order.status || 'unknown';
      statusCount[status] = (statusCount[status] || 0) + 1;
    });
    return Object.keys(statusCount).map(status => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: statusCount[status]
    }));
  };
  
  // Process data for supplier distribution
  const getSupplierData = () => {
    const supplierCount = {};
    safeOrders.forEach(order => {
      if (!order || !order.supplier) return;
      const supplierName = order.supplier_details?.name || 'Unknown';
      supplierCount[supplierName] = (supplierCount[supplierName] || 0) + 1;
    });
    
    return Object.keys(supplierCount).map(supplier => ({
      name: supplier,
      orders: supplierCount[supplier]
    })).sort((a, b) => b.orders - a.orders).slice(0, 5);
  };

  
  // Process data for order timeline
  const getTimelineData = () => {
    const timeline = {};
    
    // Group by month or week depending on timeframe
    safeOrders.forEach(order => {
      if (!order || !order.order_date) return;
      
      const date = new Date(order.order_date);
      let key;
      
      if (timeframe === 'month') {
        key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      } else {
        // Get ISO week number
        const dayNum = date.getUTCDay() || 7;
        const dateObj = new Date(date.getTime());
        dateObj.setUTCDate(date.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(dateObj.getUTCFullYear(), 0, 1));
        const weekNo = Math.ceil((((dateObj - yearStart) / 86400000) + 1) / 7);
        key = `Week ${weekNo}`;
      }
      
      if (!timeline[key]) {
        timeline[key] = { name: key, placed: 0, accepted: 0, approved: 0 };
      }
      
      const status = order.status || 'placed';
      timeline[key][status] += 1;
    });
    
    return Object.values(timeline).sort((a, b) => a.name.localeCompare(b.name));
  };
  
  // Calculate KPIs with safe checks
  const totalOrders = safeOrders.length;
  const pendingOrders = safeOrders.filter(order => order && order.status === 'placed').length;
  const approvedOrders = safeOrders.filter(order => order && order.status === 'approved').length;
  const acceptedOrders = safeOrders.filter(order => order && order.status === 'accepted').length;
  
  const totalQuantity = safeOrders.reduce((sum, order) => {
    if (!order) return sum;
    return sum + (order.quantity_ordered || 1);
  }, 0);
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const ordersThisMonth = safeOrders.filter(order => {
    if (!order || !order.order_date) return false;
    const orderDate = new Date(order.order_date);
    return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
  }).length;
  
  // If there are no orders, show an empty state
  if (totalOrders === 0) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Order Dashboard</h1>
          <div className="bg-white p-10 rounded-xl shadow-md text-center">
            <div className="mb-6 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No orders found</h2>
            <p className="text-gray-500 mb-6">Start creating orders to see your analytics here</p>
            <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Create New Order
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-8xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Order Dashboard</h1>
          <div className="flex space-x-3">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="border-gray-200 rounded-lg px-4 py-2 bg-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="month">Monthly View</option>
              <option value="week">Weekly View</option>
            </select>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Order
            </button>
          </div>
        </div>
        
        {/* KPI Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold text-gray-800">{totalOrders}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending Orders</p>
                <p className="text-3xl font-bold text-gray-800">{pendingOrders}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Items Ordered</p>
                <p className="text-3xl font-bold text-gray-800">{totalQuantity}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Orders This Month</p>
                <p className="text-3xl font-bold text-gray-800">{ordersThisMonth}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Status Progress - Moved to top of charts for better visibility */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Status Progress</h2>
          <div className="flex justify-between items-center mb-6">
            <div className="text-center flex-1">
              <div className="text-3xl font-bold text-yellow-500">{pendingOrders}</div>
              <div className="text-sm text-gray-500 font-medium">Placed</div>
            </div>
            <div className="text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <div className="text-center flex-1">    
              <div className="text-3xl font-bold text-blue-500">{acceptedOrders}</div>
              <div className="text-sm text-gray-500 font-medium">Accepted</div>
            </div>
            <div className="text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <div className="text-center flex-1">
              <div className="text-3xl font-bold text-green-500">{approvedOrders}</div>
              <div className="text-sm text-gray-500 font-medium">Approved</div>
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-5 overflow-hidden">
            <div className="flex h-full rounded-full">
              <div 
                className="bg-yellow-400 rounded-l-full transition-all duration-500" 
                style={{ width: `${totalOrders ? (pendingOrders / totalOrders * 100) : 0}%` }}
              />
              <div 
                className="bg-blue-400 transition-all duration-500" 
                style={{ width: `${totalOrders ? (acceptedOrders / totalOrders * 100) : 0}%` }}
              />
              <div 
                className="bg-green-400 rounded-r-full transition-all duration-500" 
                style={{ width: `${totalOrders ? (approvedOrders / totalOrders * 100) : 0}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Status Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Status Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getStatusData()}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {getStatusData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, name]} />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Top Suppliers */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Suppliers by Orders</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getSupplierData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fill: '#6B7280' }} axisLine={{ stroke: '#E5E7EB' }} />
                <YAxis tick={{ fill: '#6B7280' }} axisLine={{ stroke: '#E5E7EB' }} />
                <Tooltip cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }} />
                <Bar dataKey="orders" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Order Timeline */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Timeline</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={getTimelineData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPlaced" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorAccepted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fill: '#6B7280' }} axisLine={{ stroke: '#E5E7EB' }} />
                <YAxis tick={{ fill: '#6B7280' }} axisLine={{ stroke: '#E5E7EB' }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="placed" stackId="1" stroke="#F59E0B" fillOpacity={1} fill="url(#colorPlaced)" />
                <Area type="monotone" dataKey="accepted" stackId="1" stroke="#6366F1" fillOpacity={1} fill="url(#colorAccepted)" />
                <Area type="monotone" dataKey="approved" stackId="1" stroke="#10B981" fillOpacity={1} fill="url(#colorApproved)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthDashboard;