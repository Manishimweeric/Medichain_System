import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

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