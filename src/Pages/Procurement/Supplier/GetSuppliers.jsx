import React, { useEffect, useState } from "react";
import { fetchUsers, deleteSupplier } from '../../../api';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Search, MoreVertical, Edit2, Trash2, Plus, UserPlus, Filter, X, Mail, Phone } from 'lucide-react';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [activeRole, setActiveRole] = useState('All');
  
  const navigate = useNavigate();

  useEffect(() => {
    const getSuppliers = async () => {
      setLoading(true);
      try {
        const result = await fetchUsers();
        if (result && result.data) {
          const filteredData = result.data.filter(supplier => supplier.role !== "Procurement");
          setSuppliers(filteredData);
          setFilteredSuppliers(filteredData);
        } else {
          setError(result.detail || 'Error fetching users');
          showToast('error', result.detail || 'Error fetching users');
        }
      } catch (err) {
        setError('Failed to load users');
        showToast('error', 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    getSuppliers();
  }, []);

  const showToast = (type, message) => {
    // This would be implemented with your toast library
    console.log(`${type}: ${message}`);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterSuppliers(term, activeRole);
  };

  const filterByRole = (role) => {
    setActiveRole(role);
    filterSuppliers(searchTerm, role);
  };

  const filterSuppliers = (term, role) => {
    let filtered = suppliers;
    
    // Filter by search term
    if (term) {
      filtered = filtered.filter((supplier) =>
        supplier.name.toLowerCase().includes(term) ||
        supplier.email.toLowerCase().includes(term) ||
        supplier.phone.includes(term)
      );
    }
    
    // Filter by role
    if (role !== 'All') {
      filtered = filtered.filter((supplier) => supplier.role === role);
    }
    
    setFilteredSuppliers(filtered);
  };

  const handleDropdownToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleEdit = (id) => {
    navigate(`/Procurement/editSupplier/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      try {
        const result = await deleteSupplier(id);
        if (result.success) {
          const updatedSuppliers = suppliers.filter(supplier => supplier.id !== id);
          setSuppliers(updatedSuppliers);
          setFilteredSuppliers(updatedSuppliers.filter(supplier => 
            (activeRole === 'All' || supplier.role === activeRole) &&
            (supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
             supplier.phone.includes(searchTerm))
          ));
          showToast('success', 'User deleted successfully!');
        } else {
          showToast('error', result.message || 'Failed to delete user');
        }
      } catch (err) {
        showToast('error', 'An error occurred while deleting the user');
      }
    }
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? 
      '↑' : 
      '↓';
  };

  // Get unique roles for filter
  const uniqueRoles = ['All', ...new Set(suppliers.map(supplier => supplier.role))];

  // Sort the filtered suppliers
  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setActiveRole('All');
    setFilteredSuppliers(suppliers);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <Users className="mr-2 text-blue-600" />
            User Management
          </h1>
          <Link 
            to="/Procurement/addSupplier" 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
          >
            <UserPlus className="mr-2 w-4 h-4" />
            Add New User
          </Link>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, email or phone..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center bg-white px-3 py-2 rounded-lg border border-gray-300">
                  <Filter className="text-gray-500 w-4 h-4 mr-2" />
                  <span className="text-sm font-medium text-gray-700 mr-2">Role:</span>
                  <div className="flex flex-wrap gap-2">
                    {uniqueRoles.map(role => (
                      <button
                        key={role}
                        onClick={() => filterByRole(role)}
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          activeRole === role 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
                
                {(searchTerm || activeRole !== 'All') && (
                  <button 
                    onClick={clearFilters}
                    className="flex items-center px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              <p>{error}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {filteredSuppliers.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-500">No users found</p>
                  <p className="text-sm text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
                  <Link 
                    to="/Procurement/addSupplier" 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New User
                  </Link>
                </div>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                      <th onClick={() => requestSort('name')} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                        Name {getSortIcon('name')}
                      </th>
                      <th onClick={() => requestSort('email')} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                        Email {getSortIcon('email')}
                      </th>
                      <th onClick={() => requestSort('phone')} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                        Phone {getSortIcon('phone')}
                      </th>
                      <th onClick={() => requestSort('role')} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                        Role {getSortIcon('role')}
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Address
                      </th>
                      <th onClick={() => requestSort('registered_on')} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                        Joined On {getSortIcon('registered_on')}
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sortedSuppliers.map((supplier, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {index + 1}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="w-4 h-4 mr-1 text-gray-400" />
                            {supplier.email}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 flex items-center">
                            <Phone className="w-4 h-4 mr-1 text-gray-400" />
                            {supplier.phone}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${supplier.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 
                             supplier.role === 'Supplier' ? 'bg-green-100 text-green-800' : 
                             supplier.role === 'Warehouse' ? 'bg-blue-100 text-blue-800' : 
                             'bg-gray-100 text-gray-800'}`}>
                            {supplier.role}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {supplier.address || 'N/A'}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(supplier.registered_on).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium relative">
                          <button
                            onClick={() => handleDropdownToggle(index)}
                            className="text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-full hover:bg-gray-100"
                          >
                            <MoreVertical className="h-5 w-5" />
                          </button>
                          
                          {openDropdown === index && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                              <button 
                                onClick={() => handleEdit(supplier.id)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Edit2 className="h-4 w-4 mr-2 text-blue-500" />
                                Edit User
                              </button>
                              <button 
                                onClick={() => handleDelete(supplier.id)}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete User
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Table Footer with Stats */}
          {!loading && filteredSuppliers.length > 0 && (
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
              <div className="flex gap-4 mb-4 sm:mb-0">
                <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-lg border border-gray-200">
                  Total Users: <strong>{filteredSuppliers.length}</strong>
                </span>
                
                {activeRole !== 'All' && (
                  <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-lg border border-gray-200">
                    {activeRole} Users: <strong>{filteredSuppliers.filter(s => s.role === activeRole).length}</strong>
                  </span>
                )}
              </div>
              
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Items per page:</span>
                <select className="border border-gray-300 rounded-md text-sm p-1">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SupplierList;