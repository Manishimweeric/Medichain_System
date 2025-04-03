import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { fetchUsers,logoutUser,fetchInventory,fetchProcurementRequests,fetchOrders,fetchWarehouses } from '../../api';
import { FaUserCircle } from 'react-icons/fa';

const Dashboard = () => {
  const [supplierCount, setSupplierCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [procurementRequestsCount, setProcurementRequestsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [userRole, setUserRole] = useState('');
  const [username, setUserName]= useState('');
  const [warehosecount , setWarehoseCount] = useState('');

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    const access_token = localStorage.getItem('access_token');
    const response = await logoutUser(access_token);
    if (response.success) {
      console.log(response.message);
      localStorage.removeItem('access_token');
      localStorage.removeItem('role');
      window.location.href = '/login';
    } else {
      console.error(response.message);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem('role');
    const user = localStorage.getItem('user_id');
    setUserName(localStorage.getItem('user_name'));
    console.log(user);
    setUserRole(role || '');
    const fetchData = async () => {
      const Supplierresult = await fetchUsers();  
      const filteredData = Supplierresult.data.filter(supplier => supplier.role === "Supplier");
   
      const Usersresult = await fetchUsers();  
      const Inventoryresult = await fetchInventory();  
      const ProcurementRequestsresult = await fetchProcurementRequests(); 
      const Ordersresult = await fetchOrders();
      const warehouseRequestsresult = await fetchWarehouses();
      setSupplierCount(filteredData.length); 
      setUsersCount(Usersresult.data.length);   
      setInventoryCount(Inventoryresult.data.length);   
      setProcurementRequestsCount(ProcurementRequestsresult.data.length); 
      setOrdersCount(Ordersresult.data.length);
      setWarehoseCount(warehouseRequestsresult.data.length);
    };
    fetchData();
  }, []);

  const procurementMenuItems = [
    { name: 'Dashboard', icon: '🏠', badge: null, path: '/Procurement/home' },
    { name: 'Inventory', icon: '🔤', badge: inventoryCount, path: '/Procurement/getAllInventory' },
    { name: 'User Management', icon: '🛠️', badge: supplierCount, path: '/Procurement/GetSupplier' },
    { name: 'Supplier Order', icon: '📊', badge: ordersCount, path: '/Procurement/GetOrder' },
    { name: 'Order Report  ', icon: '📊', badge: ordersCount, path: '/Procurement/orderReport' },
  ];

  const warehouseMenuItems = [
    { name: 'Dashboard', icon: '🏠', badge: null, path: '/Procurement/warehouseInventoryDashboard' },
    { name: 'Warehouse', icon: '📈', badge: warehosecount, path: '/Procurement/GetWarehouse' },
    { name: 'Inventory', icon: '🔤', badge: inventoryCount, path: '/Procurement/GetInventory' },
    { name: 'Inventory Report', icon: '🔤', badge: 'Daily', path: '/Procurement/inventoryReport' },
  ];

  const healthcareMenuItems = [
    { name: 'Dashboard', icon: '🏠', badge: null, path: '/Procurement/HealthDashboard' },
    { name: 'Order management ', icon: '📊', badge: ordersCount, path: '/Procurement/healthOrder' },
  ];

  const supplierMenuItems = [
    { name: 'Dashboard', icon: '🏠', badge: null, path: '/Procurement/orderDashboard' },
    { name: 'Orders management', icon: '🗺️', badge: ordersCount, path: '/Procurement/Orders' },
  ];

  const getMenuItemsByRole = () => {
    switch (userRole.toLowerCase()) {
      case 'procurement':
        return procurementMenuItems;
      case 'warehouse':
        return warehouseMenuItems;
      case 'healthcare':
        return healthcareMenuItems;
      case 'supplier':
        return supplierMenuItems;
      default:
        return procurementMenuItems;
    }
  };

  const menuItems = getMenuItemsByRole();
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Header */}
      <header className="bg-gray-800 text-white py-2 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <img
              src="/images/medlogo.png"
              alt="Medicain System Logo"
              className="h-8 w-10 md:h-8 md:w-12 object-contain"
            />
            <h1 className="text-orange-500 text-xl md:text-xl font-bold tracking-tight">
              Medicain <span className="text-white">System</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 text-white text-sm rounded-full px-3 py-1 pl-8 w-32 md:w-48 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-white focus:outline-none"
            >
              <FaUserCircle size={24} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-gray-700 text-white rounded-lg shadow-lg w-40">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">Profile</li>
                  <li
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
          {/* User Profile */}
          <div className="p-4 border-b border-gray-200 flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <img src="/images/user1.png" alt="User" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-medium text-sm">{username}</p>
              <p className="text-gray-500 text-xs capitalize">{userRole || 'User'}</p>
            </div>
          </div>

          {/* Role indicator */}
          <div className="px-4 py-2 bg-gray-100 border-b border-gray-200">
            <span className="text-xs font-semibold text-gray-500">ROLE: </span>
            <span className="text-sm font-medium capitalize">{userRole || 'Not set'}</span>
          </div>

          {/* Sidebar Menu */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul>
              {menuItems.map((item, index) => (
                <li key={index} className="mb-1">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-2 text-sm ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    <div className="flex items-center">
                      <span className="text-md mr-3">{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                    <div className="flex items-center">
                      {item.badge !== null && (
                        <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-sm mr-2">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
          {/* Footer */}
          <footer className="mt-6 py-4 px-6 flex justify-between items-center text-xs text-gray-500">
            <div>Medicain System • Copyright © 2025</div>
            <div>Project Completed: 70%</div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;