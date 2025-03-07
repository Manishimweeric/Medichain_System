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
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/login/', loginData);
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

export const logoutUser = async (access_token) => {
  if (!access_token) {
    return { success: false, message: 'No access token provided.' };
  }

  try {
    const response = await post(`${API_BASE_URL}/logout/`, { access_token });

    if (response.status >= 200 && response.status < 300) {
      localStorage.removeItem('access_token'); 
      return { success: true, message: 'Logout successful!' };
    } else {
      return { success: false, message: response.data.detail || 'Something went wrong!' };
    }
  } catch (error) {
    const errorMessage = error.response?.data?.detail || error.message || 'An error occurred during logout.';
    return { success: false, message: errorMessage };
  }
};


