import React, { useEffect, useState } from "react";
import { fetchSuppliers, deleteSupplier } from '../../../api';
import { Link, useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEllipsisV } from "react-icons/fa"; 

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const getSuppliers = async () => {
      const result = await fetchSuppliers();
      if (result && result.data) {
        setSuppliers(result.data);
        setFilteredSuppliers(result.data); // Set filtered suppliers initially
      } else {
        toast.error(result.detail || 'Error fetching suppliers');
      }
    };
    getSuppliers();
  }, []);

  // Handle the search/filter by name
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter suppliers based on the name
    const filtered = suppliers.filter((supplier) =>
      supplier.name.toLowerCase().includes(term)
    );
    setFilteredSuppliers(filtered);
  };

  const handleDropdownToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleEdit = (id) => {
    navigate(`/Procurement/editSupplier/${id}`); 
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this supplier?");
    if (confirmed) {
      const result = await deleteSupplier(id);
      if (result.success) {
        setSuppliers(suppliers.filter(supplier => supplier.id !== id));
        setFilteredSuppliers(filteredSuppliers.filter(supplier => supplier.id !== id)); // Update filtered suppliers
        toast.success('Supplier deleted successfully!');
      } else {
        toast.error(result.message || 'Failed to delete supplier');
      }
    }
  };

  return (
    <div className="container p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Suppliers</h1>
        <Link 
          to="/Procurement/addSupplier" 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 inline-block"
        >
          Add New Supplier
        </Link>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by supplier name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        {error && <p className="text-center text-red-500">{error}</p>}
        {filteredSuppliers.length === 0 ? (
          <p className="text-center text-gray-500">No suppliers available. Please add a new supplier.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-3 text-xs font-medium text-center text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Joined on</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier, index) => (
                <tr key={index} className="border hover:bg-gray-50 transition-all relative text-sm">
                  <td className="px-4 py-4 whitespace-nowrap text-center">{index + 1}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">{supplier.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">{supplier.email}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">{supplier.phone}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">{supplier.address}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    {new Date(supplier.registered_on).toISOString().split('T')[0]}
                  </td>
                  <td className="border p-2 text-center relative">
                    {/* Three-dot menu */}
                    <button
                      onClick={() => handleDropdownToggle(index)}
                      className="text-gray-600 hover:text-gray-900 focus:outline-none"
                    >
                      <FaEllipsisV />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {openDropdown === index && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                        <button 
                          onClick={() => handleEdit(supplier.id)}
                          className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(supplier.id)}
                          className="block w-full px-4 py-2 text-sm text-left hover:bg-red-100 text-red-500"
                        >
                          🗑️ Delete
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
    </div>
  );
};

export default SupplierList;
