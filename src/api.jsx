import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Token ${token}`;  
      } else {
        console.log('Access token not found');
        window.location.href = '/login';
      }
      return config;
  },
  (error) => {
    console.log('Request Error:', error); 
    return Promise.reject(error);
  }
);


export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/`, loginData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    let message = 'An error occurred during login. Please try again.';
    if (error.response) {
      message = error.response.data.error || error.response.data.detail || message;
    }
    return {
      success: false,
      message: error.message,
    };
  }
};

export const logoutUser = () => {
  localStorage.removeItem('access_token');
  window.location.href = '/login';
  return { success: true, message: 'Logout successful!' };
};

export const sendOTP = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/send-otp/`, { email });
    return { success: true, message: 'OTP sent successfully!' };
  } catch (error) {
    return { success: false, message: error.response?.data?.error || 'Error sending OTP.' };
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify-otp/`, { email, otp });
    return { success: true, message: 'OTP verified successfully!' };
  } catch (error) {
    return { success: false, message: error.response?.data?.error || 'Invalid OTP.' };
  }
};

export const registerSupplier = async (supplierData) => {
  try {
    const response = await api.post('/suppliers/', supplierData);

    if (response.status >= 200 && response.status < 300) {
      return { success: true, message: 'Supplier registered successfully!' };
    } else {
      return { success: false, message: response.data.detail || 'Something went wrong!' };
    }
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || 'An error occurred while registering the supplier.' };
  }
};

export const fetchSuppliers = async () => {
  try {
    const response = await api.get('/suppliers/');
    return response;
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || 'Error fetching suppliers.' };
  }
};

export const getSupplierById = async (id) => {
  try {
    const response = await api.get(`/suppliers/${id}/`);
    return response;
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || 'Error fetching supplier by ID.' };
  }
};

export const updateSupplier = async (id, supplierData) => {
  try {
    const response = await api.put(`/suppliers/${id}/`, supplierData);

    if (response.status >= 200 && response.status < 300) {
      return { success: true, message: 'Supplier updated successfully!' };
    } else {
      return { success: false, message: response.data.detail || 'Something went wrong!' };
    }
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || 'An error occurred while updating the supplier.' };
  }
};

export const deleteSupplier = async (id) => {
  try {
    const response = await api.delete(`/suppliers/${id}/`);

    if (response.status >= 200 && response.status < 300) {
      return { success: true, message: 'Supplier deleted successfully!' };
    } else {
      return { success: false, message: response.data.detail || 'Something went wrong!' };
    }
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || 'An error occurred while deleting the supplier.' };
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/', userData);
    if (response.status >= 200 && response.status < 300) {
      return { success: true, message: 'User registered successfully!' };
    } else {
      return { success: false, message: response.data.detail || 'Something went wrong!' };
    }
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || 'An error occurred while registering the user.' };
  }
};

export const fetchUsers = async () => {
  try {
    const response = await api.get('/users/');
    return response;
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || 'Error fetching Users.' };
  }
};


export const registerInventory = async (inventoryData) => {
  console.log(inventoryData)
  try {
    const response = await api.post('/inventory/', inventoryData);
    if (response.status >= 200 && response.status < 300) {
      return { success: true, message: 'inventory Added!' };
    } else {
      return { success: false, message: response.data.detail || 'Something went wrong!' };
    }
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || 'An error occurred while registering the inventory.' };
  }
};

export const fetchInventory = async () => {
  try {
    const response = await api.get('/inventory/');
    return response;
  } catch (error) {
    return { success: false, message: error.response?.data?.detail || 'Error fetching inventory.' };
  }
};


export const updateInventoryQuantity = async (itemId, quantityToAdd) => {
  try {
    const response = await api.patch(`/inventory/${itemId}/update_quantity/`, {
      quantity: quantityToAdd
    });

    return {
      success: true,
      itemName: response.data.name,
      message: 'Inventory updated successfully'
    };
  } catch (error) {
    console.error('Error updating inventory:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update inventory'
    };
  }
};


export const createProcurementRequest = async (requestData) => {
  try {
    const response = await api.post('/procurement_requests/', requestData);

    return {
      success: true,
      data: response.data,
      message: 'Procurement request created successfully'
    };
  } catch (error) {
    console.error('Error creating procurement request:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to create procurement request'
    };
  }
};

// Fetch procurement requests
export const fetchProcurementRequests = async () => {
  try {
    const response = await api.get('/procurement_requests/');

    return {
      success: true,
      data: response.data,
      message: 'Procurement requests fetched successfully'
    };
  } catch (error) {
    console.error('Error fetching procurement requests:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch procurement requests'
    };
  }
};

// Update procurement request status
export const updateProcurementRequestStatus = async (requestId, newStatus) => {
  try {
    const response = await api.put(`/procurement_requests/${requestId}/`, {
      status: newStatus
    });

    return {
      success: true,
      data: response.data,
      message: 'Procurement request status updated successfully'
    };
  } catch (error) {
    console.error('Error updating procurement request status:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update procurement request status'
    };
  }
};

export const createOrder = async (requestData) => {
  try {
    const response = await api.post('/orders/', requestData);

    return {
      success: true,
      data: response.data,
      message: 'Order created successfully'
    };
  } catch (error) {
    console.error('Error creating order:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to create order'
    };
  }
};

export const fetchOrders = async () => {
  try {
    const response = await api.get('/orders/');

    return {
      success: true,
      data: response.data,
      message: 'Orders fetched successfully'
    };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch orders'
    };
  }
};

export const approveOrder = async () => {
  try {
    const response = await api.get('/orders/');

    return {
      success: true,
      data: response.data,
      message: 'Orders fetched successfully'
    };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch orders'
    };
  }
};
export const sendFeedback = async () => {
  try {
    const response = await api.get('/orders/');

    return {
      success: true,
      data: response.data,
      message: 'Orders fetched successfully'
    };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch orders'
    };
  }
};


export const createWarehouse = async (warehouseData) => {
  try {
    const response = await api.post('/warehouse/', warehouseData);
    return {
      success: true,
      data: response.data,
      message: 'Warehouse created successfully'
    };
  } catch (error) {
    console.error('Error creating Warehouse:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to create warehouse'
    };
  }
};

export const fetchWarehouses = async () => {
  try {
    const response = await api.get('/warehouse/');

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error fetching Warehouse:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch Warehouse'
    };
  }
};
export const deleteWarehouse = async (warehouseid) => {
  try {
    const response = await api.delete(`/warehouse/${warehouseid}`, );
    return {
      success: true,
      data: response.data,
      message: 'Warehouse Delete successfully'
    };
  } catch (error) {
    console.error('Error creating Warehouse:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to create warehouse'
    };
  }
};