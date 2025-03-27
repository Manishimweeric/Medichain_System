import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchProcurementRequests, updateProcurementRequestStatus } from '../../../api';
import { CheckIcon, XIcon, ShoppingCartIcon } from 'lucide-react';

const ProcurementRequestList = () => {
  const [procurementRequests, setProcurementRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch procurement requests
  useEffect(() => {
    const loadProcurementRequests = async () => {
      try {
        const response = await fetchProcurementRequests();
        
        if (response.data) {
          setProcurementRequests(response.data);
        } else {
          toast.error(response.message || 'Failed to fetch procurement requests');
        }
        
        setLoading(false);
      } catch (error) {
        toast.error('An unexpected error occurred while fetching procurement requests');
        setLoading(false);
      }
    };

    loadProcurementRequests();
  }, []);

  // Handle status update
  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      const response = await updateProcurementRequestStatus(requestId, newStatus);
      
      if (response.success) {
        // Update local state
        setProcurementRequests(prevRequests => 
          prevRequests.map(request => 
            request.id === requestId 
              ? { ...request, status: newStatus } 
              : request
          )
        );
        toast.success(`Request status updated to ${newStatus}`);
      } else {
        toast.error(response.message || 'Failed to update request status');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    }
  };

  // Filter and search logic with null/undefined checks
  const filteredRequests = procurementRequests.filter(request => {
    // Safely handle potential undefined values
    const itemName = request.inventory_item?.name?.toLowerCase() || '';
    const requestStatus = request.status?.toLowerCase() || '';
    const searchTermLower = searchTerm.toLowerCase();

    const matchesSearch = 
      itemName.includes(searchTermLower) || 
      requestStatus.includes(searchTermLower);
    
    const matchesStatusFilter = filterStatus 
      ? request.status === filterStatus 
      : true;

    return matchesSearch && matchesStatusFilter;
  });

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'ordered': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Procurement Requests</h1>
        <Link 
          to="/procurement/addRequest" 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 inline-block"
        >
          + Create New Request
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center space-x-4">
          <div className="flex-grow">
            <input 
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="ordered">Ordered</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Requested Quantity</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Requested Date</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>

              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request,index ) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                     <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {request.inventory_item?.name || 'Unknown Item'}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-500">
                        {request.requested_quantity || 'N/A'}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <span className={`
                        px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${getStatusColor(request.status)}
                      `}>
                        {request.status || 'N/A'}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      {request.requested_date 
                        ? new Date(request.requested_date).toLocaleDateString() 
                        : 'N/A'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <div className="flex justify-center space-x-2">
                        {/* Conditional rendering of status update buttons */}
                        {request.status === 'pending' && (
                          <>
                           <button 
                            onClick={() => handleStatusUpdate(request.id, 'approved')}
                            className="group flex items-center px-3 py-1.5 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-all duration-300 ease-in-out"
                            >
                            <CheckIcon className="h-4 w-4 mr-1.5 group-hover:scale-110 transition-transform" />
                            Approve
                            </button>
                            <button 
                                onClick={() => handleStatusUpdate(request.id, 'rejected')}
                                className="group flex items-center px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-all duration-300 ease-in-out"
                                >
                                <XIcon className="h-4 w-4 mr-1.5 group-hover:scale-110 transition-transform" />
                                Reject
                                </button>
                          </>
                        )}
                        {request.status === 'approved' && (
                           <button 
                           onClick={() => onStatusUpdate(request.id, 'ordered')}
                           className="group flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-all duration-300 ease-in-out"
                         >
                           <ShoppingCartIcon className="h-4 w-4 mr-1.5 group-hover:scale-110 transition-transform" />
                           Mark as Ordered
                         </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                    No procurement requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {!loading && (
          <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Total Requests: {filteredRequests.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcurementRequestList;