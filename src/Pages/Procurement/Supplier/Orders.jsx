import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {  
  fetchOrders,
  approveOrder,
} from '../../../api';
import { 
  PackageIcon, 
  TruckIcon, 
  PlusIcon,
  CheckCircleIcon, 
  XCircleIcon,
  ClipboardCheckIcon,
  SendIcon 
} from 'lucide-react';

const OrderManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [selectedOrderForApproval, setSelectedOrderForApproval] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [Delivery_date , setSelectedDeliveryDate] = useState('');
  const [ordersCount, setOrdersCount] = useState(0);
  const navigate = useNavigate();

  const fetchOrdersData = async () => {
    try {
        const userId = localStorage.getItem('user_id');
      const ordersResponse = await fetchOrders();
      if (ordersResponse.data) {
        const approvedOrders = ordersResponse.data.filter(
          order => (order.status === "approved" || order.status === "accepted" ) 
        );
        setOrders(approvedOrders);
        setFilteredOrders(approvedOrders);
        setOrdersCount(approvedOrders.length);
    }
    } catch (error) {
      toast.error('Failed to fetch orders');
    }
  };
  
  

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await fetchOrdersData();
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
      placed: 'bg-yellow-100 text-yello w-800',
      shipped: 'bg-blue-100 text-blue-800',
      accepted: 'bg-green-100 text-green-800',
      canceled: 'bg-red-100 text-red-800',
      approved: 'bg-blue-100 text-blue-800', 
      pending_approval: 'bg-orange-100 text-orange-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };
  

  const getStatusIcon = (status) => {
    const statusIcons = {
      placed: PackageIcon,
      shipped: TruckIcon,
      delivered: CheckCircleIcon,
      canceled: XCircleIcon,
      pending_approval: ClipboardCheckIcon
    };
    return statusIcons[status] || PackageIcon;
  };

  const openApprovalModal = (order) => {
    setSelectedOrderForApproval(order);
    setIsApprovalModalOpen(true);
  };


  const handleOrderApproval = async () => {
    if (!Delivery_date ) {
      toast.error('Please select a Delivery date');
      return;
    }

    try {
      const approvalData = {
        estimated_delivery: Delivery_date,
        status: 'accepted'
      };
      console.log(approvalData);

      const response = await approveOrder(approvalData,selectedOrderForApproval.id);
      if (response.success) {
        toast.success('Order Accepted successfully');
        const updatedOrders = orders.map(order => 
          order.id === selectedOrderForApproval.id 
            ? { ...order, status: 'Accepted' } 
            : order
        );
        setOrders(updatedOrders);
        await fetchOrdersData();
        setIsApprovalModalOpen(false);
        setSelectedSupplier('');
        setSelectedWarehouse('');
        setSelectedOrderForApproval(null);
      } else {
        toast.error(response.message || 'Failed to Accepted order');
      }
    } catch (error) {
      toast.error('An unexpected error occurred during Accepted');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <PackageIcon className="mr-3 text-blue-600" size={32} />
          Order Management
        </h1>
        <Link 
          to="/Procurement/addOrder" 
          className="flex items-center px-3 py-1 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-colors"
          >
          
         Total Order : {ordersCount} items
        </Link>
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
              {['Order #', 'Item', 'Quantity','Ware House', 'Estimated Delivery', 'Status', 'Actions'].map((header) => (
                <th 
                  key={header} 
                  className="px-4 py-3  text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => {
              const StatusIcon = getStatusIcon(order.status);
              return (
                <tr key={order.id} className="border-b hover:bg-gray-50 text-sm">
                  <td className="px-4 py-3 text-center">{order.id}</td>
                  <td className="px-4 py-3 text-center">{order.inventory_details?.name || "No Inventory Item"}</td>
                  <td className="px-4 py-3 text-center">{order.quantity_ordered}</td>
                  <td className="px-4 py-3 text-center">{order.WareHouse_details?.name}</td>
                  <td className="px-4 py-3 text-center">
                    {new Date(order.estimated_delivery).toLocaleDateString() ||  "No Delivered Date "}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`
                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${getStatusColor(order.status)}
                    `}>
                        <StatusIcon className="mr-1.5 h-3.5 w-3.5" />
                        {order.status === "approved" ? "New" : order.status}
                    </span>
                    </td>
                  <td className="px-4 py-3  space-x-2 w-20">
                    <div className="flex text-center">
                        <button 
                        onClick={() => openApprovalModal(order)}
                        className="flex items-center px-3 py-1 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition-colors"
                        >
                        <CheckCircleIcon className="mr-2 w-4 h-4  text-green-600 group-hover:text-white" />
                        Accepted
                        </button>
                        </div>
                      
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

      {/* Approval Modal */}
      {isApprovalModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <CheckCircleIcon className="mr-2 text-green-600" />
              Accepted Order
            </h2>
            <p className="text-gray-600 mb-4">
              Select a Estimated Delivery Date for Accepted this order
            </p>

            <div className="space-y-4">
              <div>
                <label 
                  htmlFor="supplier-select" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Delivery Date
                </label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={Delivery_date}
                    onChange={(e) => setSelectedDeliveryDate(e.target.value)}
                    className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150"
                    required
                 />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setIsApprovalModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleOrderApproval}
                disabled={!selectedOrderForApproval || selectedOrderForApproval.status.toLowerCase() === "accepted"}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title={selectedOrderForApproval?.status.toLowerCase() === "accepted" ? "This order has already been accepted" : ""}
                >
                {selectedOrderForApproval?.status.toLowerCase() === "accepted" 
                    ? "Already Accepted" 
                    : "Accept Order"}
                </button>

            </div>
          </div>
        </div>
      )}     
    </div>
  );
};

export default OrderManagement;