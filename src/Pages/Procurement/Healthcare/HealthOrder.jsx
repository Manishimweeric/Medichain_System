import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  fetchOrders,
  fetchWarehouses,
  fetchInventory,
  createOrder
} from '../../../api';

import {
  PackageIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClipboardCheckIcon,
  FilterIcon,
  RefreshCwIcon,
  PlusIcon,
  EyeIcon,
  XIcon
} from 'lucide-react';

const OrderManagement = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [ordersCount, setOrdersCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [userid, setUserId] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // New Order Form State
  const [newOrder, setNewOrder] = useState({
    inventory: '',
    quantity: 1,
  });

  useEffect(() => {
    const getUserRole = async () => {
      const user = localStorage.getItem('user_id');
      setUserId(user || '');
    };
    getUserRole();
  }, []);

  const fetchOrdersData = async () => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem('user_id');
      const ordersResponse = await fetchOrders();

      if (ordersResponse.data) {
        const approvedOrders = ordersResponse.data.filter(
          order => (order.status === "placed" || order.status === "accepted" && order.Send_by===userId)
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

  const fetchWarehousesData = async () => {
    try {
      const response = await fetchWarehouses();
      setWarehouses(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch warehouses');
    }
  };

  const fetchInventoryData = async () => {
    try {
      const response = await fetchInventory();
      setInventory(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch inventory');
    }
  };

  useEffect(() => {
    fetchOrdersData();
    fetchWarehousesData();
    fetchInventoryData();
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    console.log("User id is " + userid)
    try {
      const formData = {
        inventory_item: newOrder.inventory,
        quantity_ordered: parseInt(newOrder.quantity),
        Send_by: userid
      };
      console.log(formData);

      const response = await createOrder(formData);
      if (response.success) {
        toast.success('Order created successfully');
        setIsModalOpen(false);
        setNewOrder({
          inventory: '',
          quantity: 1,
        });
      } else {
        toast.error(response.message || 'Failed to create order');
      }
      fetchOrdersData();
    } catch (error) {
      toast.error('Failed to create order');
    }
  };

  const openDetailModal = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <PackageIcon className="mr-3 text-indigo-600" size={32} />
            Order Management
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              New Order
            </button>
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
                  <option value="placed">Placed</option>
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
                      {['Order #', 'Item', 'Quantity', 'Warehouse', 'Est. Delivery','Created At', 'Status','Actions'].map((header) => (
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
                    {currentItems.map((order) => {
                      const StatusIcon = getStatusIcon(order.status);
                      return (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">#{order.id}</td>
                          <td className="px-6 py-4 text-center text-sm text-gray-800">{order.inventory_details?.name || "No Item"}</td>
                          <td className="px-6 py-4 text-center text-sm text-gray-800">
                            <span className="font-medium bg-gray-100 px-2 py-1 rounded-md">{order.quantity_ordered}</span>
                          </td>
                          <td className="px-6 py-4 text-center text-sm text-gray-800">{order.WareHouse_details?.name || "No Warehouse"}</td>
                          <td className="px-6 py-4 text-center text-sm text-gray-800">
                            {order.estimated_delivery ? new Date(order.estimated_delivery).toLocaleDateString() : "Not set"}
                          </td>
                          <td className="px-6 py-4 text-center text-sm text-gray-800">
                            {order.order_date ? new Date(order.order_date).toLocaleDateString() : "Not Date"}
                          </td>
                          <td className="px-6 py-4 text-center text-sm">
                            <span className={`
                              inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                              ${getStatusColor(order.status)}
                            `}>
                              <StatusIcon className="mr-1.5 h-3.5 w-3.5" />
                              {order.status}
                            </span>
                          </td>
                          
                          <td className="px-6 py-4 text-center text-sm">
                            <button
                              onClick={() => openDetailModal(order)}
                              className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                            >
                              <EyeIcon className="w-4 h-4 mr-1" />
                              View
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

              {/* Pagination Controls */}
              <div className="flex justify-center items-center py-4">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="mx-4 text-sm text-gray-700">
                  Page {currentPage} of {Math.ceil(filteredOrders.length / itemsPerPage)}
                </span>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredOrders.length / itemsPerPage)}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* New Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <PlusIcon className="w-5 h-5 mr-2 text-indigo-600" />
                Create New Order
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateOrder} className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="inventory_id" className="block text-sm font-medium text-gray-700">
                    Select Inventory Item Name
                  </label>
                  <select
                    id="inventory"
                    name="inventory"
                    value={newOrder.inventory}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select Item</option>
                    {inventory.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="quantity_ordered" className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={newOrder.quantity}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {isDetailModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <EyeIcon className="w-5 h-5 mr-2 text-indigo-600" />
                Order Details #{selectedOrder.id}
              </h3>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Order Information
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Status:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Created:</span>
                      <span className="text-sm text-gray-900">
                        {selectedOrder.order_date ? new Date(selectedOrder.order_date).toLocaleString() : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Last Updated:</span>
                      <span className="text-sm text-gray-900">
                        {selectedOrder.order_date ? new Date(selectedOrder.order_date).toLocaleString() : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Est. Delivery:</span>
                      <span className="text-sm text-gray-900">
                        {selectedOrder.estimated_delivery ? new Date(selectedOrder.estimated_delivery).toLocaleDateString() : "Not set"}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Item Details
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Item:</span>
                      <span className="text-sm text-gray-900 font-medium">{selectedOrder.inventory_details?.name || "No Item"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Quantity:</span>
                      <span className="text-sm text-gray-900 font-medium">{selectedOrder.quantity_ordered}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Warehouse:</span>
                      <span className="text-sm text-gray-900">{selectedOrder.WareHouse_details?.name || "No Warehouse"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Warehouse Location:</span>
                      <span className="text-sm text-gray-900">{selectedOrder.WareHouse_details?.location || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedOrder.message && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Message
                  </h4>
                  <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                    <p className="text-sm text-gray-800">{selectedOrder.message}</p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Order Timeline
                </h4>
                <div className="flow-root">
                  <ul className="-mb-8">
                    <li className="relative pb-8">
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                            <CheckCircleIcon className="h-5 w-5 text-white" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-900">Order {selectedOrder.status}</p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            {selectedOrder.estimated_delivery ? new Date(selectedOrder.estimated_delivery).toLocaleString() : "N/A"}
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
