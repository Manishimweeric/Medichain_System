import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { 
  fetchUsers, 
  fetchInventory, 
  createOrder, 
  fetchOrders 
} from '../../../api';
import { 
  PackageIcon, 
  PlusIcon, 
  TruckIcon, 
  CheckCircleIcon, 
  XCircleIcon 
} from 'lucide-react';

const OrderManagement = () => {
  // State for Order Creation
  const [suppliers, setSuppliers] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [userid, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const getUserRole = async () => {
      const user = localStorage.getItem('user_id');
        setUserId(user || '');
    };
    getUserRole();
},[]);
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [suppliersResponse, inventoryResponse, ordersResponse] = await Promise.all([
          fetchUsers(),
          fetchInventory(),
          fetchOrders()
        ]);

        if (suppliersResponse.data) setSuppliers(suppliersResponse.data);
        if (inventoryResponse.data) setInventoryItems(inventoryResponse.data);
        if (ordersResponse.data) {
          setOrders(ordersResponse.data);
          setFilteredOrders(ordersResponse.data);
        }
      } catch (error) {
        toast.error('Failed to load initial data');
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    let result = orders;
    if (statusFilter) {
      result = result.filter(order => order.status === statusFilter);
    }
    setFilteredOrders(result);
  }, [statusFilter, orders]);

  const getStatusColor = (status) => {
    const statusColors = {
      placed: 'bg-yellow-100 text-yellow-800',
      shipped: 'bg-blue-100 text-blue-800',
      delivered: 'bg-green-100 text-green-800',
      canceled: 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const statusIcons = {
      placed: PackageIcon,
      shipped: TruckIcon,
      delivered: CheckCircleIcon,
      canceled: XCircleIcon
    };
    return statusIcons[status] || PackageIcon;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (!selectedItem || !quantity ) {
      toast.error('Please fill in all required fields');
      return;
    }
    setLoading(true);
    console.log("User id is "+userid)
     const orderData = {
        inventory_item: selectedItem,
        quantity_ordered: parseInt(quantity),
        Send_by: userid
    };

    try {
      const response = await createOrder(orderData);
      
      if (response.success) {
        toast.success('Order created successfully');
        setSelectedSupplier('');
        setSelectedItem('');
        setQuantity('');
        setEstimatedDelivery('');
      } 
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
        <Link 
          to="/orders/list" 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 inline-block"
        >
          View Order List
        </Link>
      </div>

      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg border border-gray-100 p-8 mb-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Create New Order</h2>
          <p className="text-gray-600 mt-2">Place a new order for inventory items</p>
        </div>

        <form onSubmit={handleSubmitOrder} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Inventory Item
              </label>
              <select
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Item</option>
                {inventoryItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => navigate('/orders/list')}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Creating Order...' : 'Create Order'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center space-x-4">
          <h3 className="text-xl font-semibold text-gray-800">Recent Orders</h3>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="placed">Placed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Order #</th>
              <th className="px-4 py-3 text-left">Supplier</th>
              <th className="px-4 py-3 text-left">Item</th>
              <th className="px-4 py-3 text-center">Quantity</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Estimated Delivery</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => {
              const StatusIcon = getStatusIcon(order.status);
              return (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{order.id}</td>
                  <td className="px-4 py-3">{order.supplier_details?.name || "No Supplier"}</td>
                  <td className="px-4 py-3">{order.inventory_details?.name || "No Inventory Item"}</td>
                  <td className="px-4 py-3 text-center">{order.quantity_ordered}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`
                      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${getStatusColor(order.status)}
                    `}>
                      <StatusIcon className="mr-1.5 h-3.5 w-3.5" />
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {new Date(order.estimated_delivery).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No orders found
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;