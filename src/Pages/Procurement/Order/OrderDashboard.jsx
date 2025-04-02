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

const OrderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('month');

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem('user_id');
        const ordersResponse = await fetchOrders();
        
        // Handle the specific response format you mentioned
        if (ordersResponse.data) {
            const approvedOrders = ordersResponse.data.filter(
                order => (order.supplier==userId)
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

  if (loading) return <div className="flex items-center justify-center h-64">Loading dashboard data...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  
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
      <div className="p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">Order Dashboard</h1>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-500 mb-4">No orders found</p>
          <p className="text-sm text-gray-400">Create orders to see analytics here</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Order Dashboard</h1>
      
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <p className="text-3xl font-bold">{totalOrders}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Pending Orders</p>
          <p className="text-3xl font-bold">{pendingOrders}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Total Items Ordered</p>
          <p className="text-3xl font-bold">{totalQuantity}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Orders This Month</p>
          <p className="text-3xl font-bold">{ordersThisMonth}</p>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Order Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={getStatusData()}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {getStatusData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Top Suppliers */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Top Suppliers by Orders</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getSupplierData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Order Timeline */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Order Timeline</h2>
          <div className="flex justify-end mb-2">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="border rounded p-1 text-sm"
            >
              <option value="month">Monthly</option>
              <option value="week">Weekly</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={getTimelineData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="placed" stackId="1" fill="#FFBB28" stroke="#FFBB28" />
              <Area type="monotone" dataKey="accepted" stackId="1" fill="#00C49F" stroke="#00C49F" />
              <Area type="monotone" dataKey="approved" stackId="1" fill="#0088FE" stroke="#0088FE" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
     
        
        {/* Status Progress */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Order Status Progress</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="text-center flex-1">
              <div className="text-3xl font-bold">{pendingOrders}</div>
              <div className="text-sm text-gray-500">Placed</div>
            </div>
            <div className="text-gray-400">→</div>
            <div className="text-center flex-1">    
              <div className="text-3xl font-bold">{acceptedOrders}</div>
              <div className="text-sm text-gray-500">Accepted</div>
            </div>
            <div className="text-gray-400">→</div>
            <div className="text-center flex-1">
              <div className="text-3xl font-bold">{approvedOrders}</div>
              <div className="text-sm text-gray-500">Approved</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="flex h-full rounded-full">
              <div 
                className="bg-yellow-400 rounded-l-full" 
                style={{ width: `${totalOrders ? (pendingOrders / totalOrders * 100) : 0}%` }}
              />
              <div 
                className="bg-blue-400" 
                style={{ width: `${totalOrders ? (acceptedOrders / totalOrders * 100) : 0}%` }}
              />
              <div 
                className="bg-green-400 rounded-r-full" 
                style={{ width: `${totalOrders ? (approvedOrders / totalOrders * 100) : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDashboard;