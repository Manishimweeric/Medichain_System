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
  SendIcon,
  FilterIcon,
  RefreshCwIcon
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
  const [deliveryDate, setSelectedDeliveryDate] = useState('');
  const [ordersCount, setOrdersCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  const fetchOrdersData = async () => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem('user_id');
      const ordersResponse = await fetchOrders();
      
      if (ordersResponse.data) {
        const approvedOrders = ordersResponse.data.filter(
          order => (order.status === "approved" || order.status === "accepted" && order.supplier==userId)
        );
        setOrders(approvedOrders);
        setFilteredOrders(approvedOrders);
        setOrdersCount(approvedOrders.length);
      }
    } catch (error) {
      toast.error('Failed to fetch orders');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdersData();
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
      accepted: 'bg-green-100 text-green-800',
      canceled: 'bg-red-100 text-red-800',
      approved: 'bg-indigo-100 text-indigo-800',
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
    if (!deliveryDate) {
      toast.error('Please select a delivery date');
      return;
    }

    try {
      const approvalData = {
        estimated_delivery: deliveryDate,
        status: 'accepted'
      };
      console.log(approvalData);

      const response = await approveOrder(approvalData,selectedOrderForApproval.id);
      // Simulating API call
      setTimeout(() => {
        toast.success('Order accepted successfully');
        const updatedOrders = orders.map(order =>
          order.id === selectedOrderForApproval.id
            ? { ...order, status: 'accepted', estimated_delivery: deliveryDate }
            : order
        );
        setOrders(updatedOrders);
        setIsApprovalModalOpen(false);
        setSelectedDeliveryDate('');
        setSelectedOrderForApproval(null);
      }, 500);
    } catch (error) {
      toast.error('An unexpected error occurred during acceptance');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <PackageIcon className="mr-3 text-indigo-600" size={32} />
            Order Management
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={fetchOrdersData}
              className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors text-gray-700"
            >
              <RefreshCwIcon className="w-5 h-5 mr-2" />
              Refresh
            </button>
            <div className="flex items-center px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-700 font-medium">
              <PackageIcon className="mr-2 w-5 h-5" />
              Total Orders: {ordersCount}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="p-6 bg-white border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <ClipboardCheckIcon className="mr-2 text-indigo-600 w-5 h-5" />
                Orders Awaiting Acceptance
              </h3>
              <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1 border border-gray-200">
                <FilterIcon className="text-gray-500 w-4 h-4 ml-2" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-transparent border-none focus:ring-0 text-sm text-gray-700"
                >
                  <option value="">All Statuses</option>
                  <option value="approved">New</option>
                  <option value="accepted">Accepted</option>
                </select>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Order #', 'Item', 'Quantity', 'Warehouse', 'Est. Delivery', 'Status', 'Actions'].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map((order) => {
                      const StatusIcon = getStatusIcon(order.status);
                      return (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">#{order.id}</td>
                          <td className="px-6 py-4 text-center text-sm text-gray-800">{order.inventory_details?.name || "No Item"}</td>
                          <td className="px-6 py-4 text-center text-sm text-gray-800">
                            <span className="font-medium bg-gray-100 px-2 py-1 rounded-md">{order.quantity_ordered}</span>
                          </td>
                          <td className="px-6 py-4 text-center text-sm text-gray-800">{order.WareHouse_details?.name}</td>
                          <td className="px-6 py-4 text-center text-sm text-gray-800">
                            {order.estimated_delivery ? new Date(order.estimated_delivery).toLocaleDateString() : "Not set"}
                          </td>
                          <td className="px-6 py-4 text-center text-sm">
                            <span className={`
                              inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                              ${getStatusColor(order.status)}
                            `}>
                              <StatusIcon className="mr-1.5 h-3.5 w-3.5" />
                              {order.status === "approved" ? "New" : order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center text-sm font-medium">
                            <button
                              onClick={() => openApprovalModal(order)}
                              disabled={order.status === "accepted"}
                              className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium
                                ${order.status === "accepted" 
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                                  : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"}`}
                            >
                              <CheckCircleIcon className="mr-1.5 w-4 h-4" />
                              {order.status === "accepted" ? "Accepted" : "Accept"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filteredOrders.length === 0 && (
                <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
                    <PackageIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
                  <p className="mt-2 text-sm text-gray-500">Try changing your filter or refresh the page.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Approval Modal */}
      {isApprovalModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-center mb-2">Accept Order #{selectedOrderForApproval?.id}</h2>
            <p className="text-gray-600 text-center mb-6">
              Please select an estimated delivery date to accept this order.
            </p>

            <div className="space-y-4">
              <div>
                <label 
                  htmlFor="item-details" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Item Details
                </label>
                <div className="bg-gray-50 px-4 py-3 rounded-md text-sm text-gray-800">
                  {selectedOrderForApproval?.inventory_details?.name} (Qty: {selectedOrderForApproval?.quantity_ordered})
                </div>
              </div>
              
              <div>
                <label 
                  htmlFor="warehouse" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Warehouse
                </label>
                <div className="bg-gray-50 px-4 py-3 rounded-md text-sm text-gray-800">
                  {selectedOrderForApproval?.WareHouse_details?.name}
                </div>
              </div>
              
              <div>
                <label 
                  htmlFor="delivery-date" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Estimated Delivery Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="delivery-date"
                  name="delivery-date"
                  value={deliveryDate}
                  onChange={(e) => setSelectedDeliveryDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
            </div>

            <div className="flex justify-between space-x-3 mt-8">
              <button
                onClick={() => setIsApprovalModalOpen(false)}
                className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleOrderApproval}
                disabled={!deliveryDate}
                className="w-full px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Accept Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;