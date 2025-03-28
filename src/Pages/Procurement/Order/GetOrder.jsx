import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { 
  fetchSuppliers, 
  fetchInventory, 
  createOrder, 
  fetchOrders,
  approveOrder,
  sendFeedback 
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
  const [inventoryItems, setInventoryItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');

  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedOrderForApproval, setSelectedOrderForApproval] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [message, setMessage] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [ordersCount, setOrdersCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [suppliersResponse, inventoryResponse, ordersResponse] = await Promise.all([
          fetchSuppliers(),
          fetchInventory(),
          fetchOrders()
        ]);

        if (suppliersResponse.data) setSuppliers(suppliersResponse.data);
        if (inventoryResponse.data) setInventoryItems(inventoryResponse.data);
        if (ordersResponse.data) {
          setOrders(ordersResponse.data);
          setFilteredOrders(ordersResponse.data);
        }

        setOrdersCount(orders.length);
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
      canceled: 'bg-red-100 text-red-800',
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

  const openFeedbackModal = (order) => {
    setSelectedOrderForApproval(order);
    setIsFeedbackModalOpen(true);
  };

  const handleOrderApproval = async () => {
    if (!selectedSupplier || !selectedWarehouse) {
      toast.error('Please select a supplier and warehouse');
      return;
    }

    try {
      const approvalData = {
        orderId: selectedOrderForApproval.id,
        supplier: selectedSupplier,
        warehouse: selectedWarehouse
      };

      const response = await approveOrder(approvalData);

      if (response.success) {
        toast.success('Order approved successfully');
        const updatedOrders = orders.map(order => 
          order.id === selectedOrderForApproval.id 
            ? { ...order, status: 'shipped' } 
            : order
        );
        setOrders(updatedOrders);

        setIsApprovalModalOpen(false);
        setSelectedSupplier('');
        setSelectedWarehouse('');
        setSelectedOrderForApproval(null);
      } else {
        toast.error(response.message || 'Failed to approve order');
      }
    } catch (error) {
      toast.error('An unexpected error occurred during approval');
    }
  };

  const handleSendFeedback = async () => {
    if (!message || !selectedWarehouse) {
      toast.error('Please write a message and select a warehouse');
      return;
    }

    try {
      const feedbackData = {
        orderId: selectedOrderForApproval.id,
        message: message,
        warehouse: selectedWarehouse
      };

      const response = await sendFeedback(feedbackData);

      if (response.success) {
        toast.success('Feedback sent successfully');
        setIsFeedbackModalOpen(false);
        setMessage('');
        setSelectedWarehouse('');
        setSelectedOrderForApproval(null);
      } else {
        toast.error(response.message || 'Failed to send feedback');
      }
    } catch (error) {
      toast.error('An unexpected error occurred while sending feedback');
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
              {['Order #', 'Supplier', 'Item', 'Quantity', 'Status', 'Estimated Delivery', 'Actions'].map((header) => (
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
                  <td className="px-4 py-3 text-center">{order.supplier_details?.name || "No Supplier"}</td>
                  <td className="px-4 py-3 text-center">{order.inventory_details?.name || "No Inventory Item"}</td>
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
                    {new Date(order.estimated_delivery).toLocaleDateString() ||  "No Delivered Date "}
                  </td>
                  <td className="px-4 py-3  space-x-2 w-80">
                    {order.status === 'placed' && (
                      <>
                    <div className="flex text-center">
                        <button 
                        onClick={() => openApprovalModal(order)}
                        className="flex items-center px-3 py-1 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-colors"
                        >
                        <CheckCircleIcon className="mr-2 w-4 h-4  text-blue-600 group-hover:text-white" />
                        Approve
                        </button>

                        <button 
                        onClick={() => openFeedbackModal(order)}
                        className="flex items-center ml-5 px-3 py-1 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition-colors"
                        >
                        <SendIcon className="mr-2 text-green-600 w-4 h-4 group-hover:text-white" />
                        Send Feedback
                        </button>
                        </div>
                      </>
                    )}
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
              <CheckCircleIcon className="mr-2 text-blue-600" />
              Approve Order
            </h2>
            <p className="text-gray-600 mb-4">
              Select a supplier and warehouse to approve this order
            </p>

            <div className="space-y-4">
              <div>
                <label 
                  htmlFor="supplier-select" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Supplier
                </label>
                <select
                  id="supplier-select"
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose a supplier</option>
                  {suppliers.map((supplier) => (
                    <option 
                      key={supplier.id} 
                      value={supplier.id.toString()}
                    >
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label 
                  htmlFor="warehouse-select"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Warehouse
                </label>
                <select
                  id="warehouse-select"
                  value={selectedWarehouse}
                  onChange={(e) => setSelectedWarehouse(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose a warehouse</option>
                  <option value="warehouse1">Main Warehouse</option>
                  <option value="warehouse2">North Warehouse</option>
                  <option value="warehouse3">South Warehouse</option>
                </select>
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
                disabled={!selectedSupplier || !selectedWarehouse}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                
              >
                Approve Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {isFeedbackModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <SendIcon className="mr-2 text-green-600" />
              Send Feedback for Order
            </h2>
            <p className="text-gray-600 mb-4">
              Write a message and select a warehouse to send feedback
            </p>

            <div className="space-y-4">
              <div>
                <label 
                  htmlFor="feedback-message" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Feedback Message
                </label>
                <textarea
                  id="feedback-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                  placeholder="Write your feedback here..."
                ></textarea>
              </div>

              <div>
                <label 
                  htmlFor="warehouse-select"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Warehouse
                </label>
                <select
                  id="warehouse-select"
                  value={selectedWarehouse}
                  onChange={(e) => setSelectedWarehouse(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Choose a warehouse</option>
                  <option value="warehouse1">Main Warehouse</option>
                  <option value="warehouse2">North Warehouse</option>
                  <option value="warehouse3">South Warehouse</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setIsFeedbackModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendFeedback}
                disabled={!message || !selectedWarehouse}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Send Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;