import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUsers } from "../../../api";
import { FaEllipsisV } from "react-icons/fa"; 

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (error) {
        toast.error("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleEdit = (id) => {
    toast.info(`Editing user with ID: ${id}`);
  };

  const handleDelete = (id) => {
    toast.error(`Deleting user with ID: ${id}`);
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const filteredUsers = users.filter((user) =>
    user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">User Management</h2>
        {/* <Link
          to="/Procurement/addUser"
          className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          + Add User
        </Link> */}
      </div>

      <div className="bg-white shadow-lg rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search by email..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center py-6 text-gray-500">Loading users...</div>
        ) : (
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-700 border-b border-gray-200 text-center">
                <th className="px-6 py-3 text-left text-sm font-medium">#</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Role</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                     <td className="px-6 py-4 text-gray-700 ">{index+1}</td>
                    <td className="px-6 py-4 text-gray-700 ">{user.email}</td>
                    <td className="px-6 py-4 text-gray-700">{user.role}</td>
                    <td className="px-6 py-4 relative">
                      <button
                        onClick={() => toggleDropdown(index)}
                       className="text-gray-600 hover:text-gray-600 focus:outline-none"
                      >
                         <FaEllipsisV />
                      </button>

                      {openDropdown === index && (
                      <div className="absolute right-28 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
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
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserList;
